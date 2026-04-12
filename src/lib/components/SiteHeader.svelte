<script>
import { links } from "$lib/routes";
import BorderLine from "./BorderLine.svelte";
import Flex from "./Flex.svelte";
import FlexPush from "./FlexPush.svelte";
import Link from "./Link.svelte";

const navigationLinks = [
	{
		href: links.characterSelect(),
		label: "Character select",
	},
	{
		href: links.gridGenerator(),
		label: "Grid generator",
	},
	{
		href: links.spells(),
		label: "Spells",
	},
];
</script>

<header class="hide-print">
	<div class="inner">
		<Flex align="center">
			<h1>
				<Link href={links.characterSelect()}>D&D Character Sheet creator</Link>
			</h1>

			<FlexPush />

			<nav>
				{#each navigationLinks as { href, label }}
					<div class="link">
						<Link {href}>{label}</Link>
					</div>
				{/each}
			</nav>
		</Flex>
	</div>

	<BorderLine faded />
</header>

<style lang="scss">
  header {
    margin-bottom: var(--gutter);
  }

  .inner {
    padding: calc(var(--gutter) * 2) var(--gutter);
  }

  nav {
    display: flex;

    .link {
      position: relative;
      padding: calc(var(--gutter) * 0.5);

      &:has(:global(.active))::after {
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: var(--color-faded);
      }
    }
  }
</style>
