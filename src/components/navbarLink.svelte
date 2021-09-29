<script lang="ts">
  export let href: string;
  export let text: string;

  export let isActive: boolean;
</script>

<a
  href={href}
  class="inline-block w-full py-2 mx-0 ml-6 font-medium text-left {isActive ? 'text-pink-700' : 'text-gray-700'} hover:text-pink-700 md:ml-0 md:w-auto md:px-0 md:mx-2 lg:mx-3 md:text-center"
>
  {text}
</a>
            