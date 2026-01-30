import { parseCharacter, type CharacterType } from '$lib/models';
import type { FileEntry } from '@zip.js/zip.js';

const FILE_CHARACTER_JSON = 'character.json';
const FILE_AVATAR_PREFIX = 'avatar.';

export async function createSaveData(character: CharacterType): Promise<File> {
  const { BlobReader, BlobWriter, TextReader, ZipWriter } =
    await import('@zip.js/zip.js');
  const blobFileWriter = new BlobWriter();

  const zipWriter = new ZipWriter(blobFileWriter);

  let json = structuredClone(character);
  json.avatar.blob = null;
  const characterJson = JSON.stringify(json);
  await zipWriter.add(FILE_CHARACTER_JSON, new TextReader(characterJson));

  const avatarBlob = character.avatar?.blob;
  if (avatarBlob instanceof Blob) {
    let ext = avatarBlob.type?.split('/')[1] || 'bin';
    if (ext === 'jpeg') {
      ext = 'jpg';
    }
    const fileName = `${FILE_AVATAR_PREFIX}${ext}`;
    await zipWriter.add(fileName, new BlobReader(avatarBlob));
  }

  await zipWriter.close();

  const blob = await blobFileWriter.getData();

  return new File([blob], `${character.slug}.zip`);
}

export async function parseSaveData(zip: Blob): Promise<CharacterType> {
  const { BlobReader, BlobWriter, TextWriter, ZipReader } =
    await import('@zip.js/zip.js');

  const zipReader = new ZipReader(new BlobReader(zip));
  const entries = await zipReader.getEntries();

  const avatarEntry = entries.find(
    (entry) =>
      entry.directory === false &&
      entry.filename.startsWith(FILE_AVATAR_PREFIX),
  ) as FileEntry | undefined;
  const characterEntry = entries.find(
    (entry) =>
      entry.directory === false && entry.filename === FILE_CHARACTER_JSON,
  ) as FileEntry | undefined;

  if (!characterEntry) {
    throw new Error('Invalid save data: missing character.json');
  }

  const [characterJson, avatarBlob] = await Promise.all([
    (async () => {
      const textWriter = new TextWriter();
      await characterEntry.getData(textWriter);
      const characterJson = await textWriter.getData();
      return parseCharacter(JSON.parse(characterJson));
    })(),
    (async () => {
      if (!avatarEntry) {
        return null;
      }
      const blobWriter = new BlobWriter();
      await avatarEntry.getData(blobWriter);
      const avatarBlob = await blobWriter.getData();

      return avatarBlob;
    })(),
  ]);

  characterJson.avatar.blob = avatarBlob;

  await zipReader.close();

  return characterJson;
}
