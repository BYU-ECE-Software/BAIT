<script>
    import { Card, Avatar, Dropdown, DropdownHeader, DropdownItem, DropdownDivider, Tooltip,  Button, Modal } from 'flowbite-svelte';
    
</script>
<!--
  <Button on:click={() => (clickOutsideModal = true)}>
    <div class="flex items-center space-x-4 rtl:space-x-reverse">
        <Avatar src="/images/profile-picture-1.webp" rounded />
        <div class="space-y-1 font-medium dark:text-white">
          <div>Elara</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">Receptionist</div>
        </div>
    </div>
  </Button>
  
  <Modal bind:open={clickOutsideModal} autoclose outsideclose>
   <Card padding="md">
    <div class="flex justify-end">
      <DotsHorizontalOutline />
      <Dropdown class="w-36">
        <DropdownItem>Edit</DropdownItem>
        <DropdownItem>Export data</DropdownItem>
        <DropdownItem>Delete</DropdownItem>
      </Dropdown>
    </div>
    <div class="flex flex-col items-center pb-4">
      <Avatar size="lg" src="/images/profile-picture-3.webp" />
      <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
      <span class="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
      <div class="flex mt-4 space-x-3 rtl:space-x-reverse lg:mt-6">
        <Button>Add friend</Button>
        <Button color="light" class="dark:text-white">Message</Button>
      </div>
    </div>
  </Card>
</Modal>
-->



<!-- Modal toggle -->
<button data-modal-target="progress-modal" data-modal-toggle="progress-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
  toggle modal
</button>

<!-- Main modal -->
<div id="progress-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="progress-modal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
            <div class="p-4 md:p-5">
                <svg class="w-10 h-10 text-gray-400 dark:text-gray-500 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                    <path d="M8 5.625c4.418 0 8-1.063 8-2.375S12.418.875 8 .875 0 1.938 0 3.25s3.582 2.375 8 2.375Zm0 13.5c4.963 0 8-1.538 8-2.375v-4.019c-.052.029-.112.054-.165.082a8.08 8.08 0 0 1-.745.353c-.193.081-.394.158-.6.231l-.189.067c-2.04.628-4.165.936-6.3.911a20.601 20.601 0 0 1-6.3-.911l-.189-.067a10.719 10.719 0 0 1-.852-.34 8.08 8.08 0 0 1-.493-.244c-.053-.028-.113-.053-.165-.082v4.019C0 17.587 3.037 19.125 8 19.125Zm7.09-12.709c-.193.081-.394.158-.6.231l-.189.067a20.6 20.6 0 0 1-6.3.911 20.6 20.6 0 0 1-6.3-.911l-.189-.067a10.719 10.719 0 0 1-.852-.34 8.08 8.08 0 0 1-.493-.244C.112 6.035.052 6.01 0 5.981V10c0 .837 3.037 2.375 8 2.375s8-1.538 8-2.375V5.981c-.052.029-.112.054-.165.082a8.08 8.08 0 0 1-.745.353Z"/>
                </svg>
                <h3 class="mb-1 text-xl font-bold text-gray-900 dark:text-white">Approaching Full Capacity</h3>
                <p class="text-gray-500 dark:text-gray-400 mb-6">Choosing the right server storage solution is essential for maintaining data integrity.<p>
                <div class="flex justify-between mb-1 text-gray-500 dark:text-gray-400">
                    <span class="text-base font-normal">My storage</span>
                    <span class="text-sm font-semibold text-gray-900 dark:text-white">376,3 of 500 GB used</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600">
                    <div class="bg-orange-500 h-2.5 rounded-full" style="width: 85%"></div>
                </div>
                <!-- Modal footer -->
                <div class="flex items-center mt-6 space-x-4 rtl:space-x-reverse">
                    <button data-modal-hide="progress-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Upgrade to PRO</button>
                    <button data-modal-hide="progress-modal" type="button" class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</div> 
