import type { ProficiencyType } from '../models';

export function parseModifier(modifier: number): string {
  return modifier > 0 ? `+${modifier}` : modifier.toString();
}

export function getAbilityModifier(abilityScore: number): number {
  return Math.floor((abilityScore - 10) / 2);
}

export function getProficiencyMultiplier(
  proficiencyType: ProficiencyType,
): number {
  switch (proficiencyType) {
    case 'none':
      return 0;
    case 'proficient':
      return 1;
    case 'double':
      return 2;
    case 'half':
      return 0.5;
  }
}

export function getSkillModifier(
  abilityScore: number,
  proficiencyBonus: number,
  proficiencyType: ProficiencyType,
): number {
  const multiplier = getProficiencyMultiplier(proficiencyType);
  const abilityModifier = getAbilityModifier(abilityScore);

  return Math.floor(abilityModifier + proficiencyBonus * multiplier);
}

export function entries<TKey extends string, TValue>(
  obj: Record<TKey, TValue>,
): [TKey, TValue][] {
  return Object.entries(obj) as [TKey, TValue][];
}

export function createImage(blob: Blob) {
  const url = URL.createObjectURL(blob);

  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = document.createElement('img');
    image.onload = () => {
      resolve(image);
    };
    image.onerror = () => {
      reject(new Error('Image could not be loaded'));
    };
    image.src = url;
  });
}

export async function getImageBitmap(blob: Blob): Promise<ImageBitmap> {
  const image = await createImage(blob);
  const bitmap = await createImageBitmap(image);

  return bitmap;
}

export function toggleAdd<T>(arr: T[], value: T): T[] {
  const index = arr.indexOf(value);
  const result = Array.from(arr);

  if (index === -1) {
    result.push(value);
  } else {
    result.splice(index, 1);
  }

  return result;
}
