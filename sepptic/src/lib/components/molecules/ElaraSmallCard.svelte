<script>
    import { Avatar, Dropdown, DropdownHeader, DropdownItem, DropdownDivider, Tooltip,  Button, Modal } from 'flowbite-svelte';
    let clickOutsideModal = false;
</script>

  <Button on:click={() => (clickOutsideModal = true)}>
    <div class="flex items-center space-x-4 rtl:space-x-reverse">
        <Avatar src="/images/profile-picture-1.webp" rounded />
        <div class="space-y-1 font-medium dark:text-white">
          <div>Elara</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">Receptionist</div>
        </div>
    </div>
  </Button>
  
  <Modal title="Elara" bind:open={clickOutsideModal} autoclose outsideclose>
    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.</p>
    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.</p>
    <svelte:fragment slot="footer">
      <Button on:click={() => alert('Handle "success"')}>I accept</Button>
      <Button color="alternative">Close</Button>
    </svelte:fragment>
  </Modal>