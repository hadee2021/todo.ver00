<template>
<div>
  <!--
  <div 
    v-for="(todo, index) in todos"
    :key="todo.id"
    class="card mt-2"
  > -->
  <List
    :items="todos"
  >
    <template #default="{ item, index }">
      <div 
        class="card-body p-2 d-flex align-items-center"
        style="cursor: pointer"
        @click.stop="moveToPage(item.id)"
      >
        <div class="flex-grow-1">
          <input 
            class="ml-2 mr-2"
            type="checkbox"
            :checked ="item.completed"
            @change="toggleTodo(index, $event)"
            @click.stop
          >
          <span 
            :class="{ todo: item.completed }"
          > 
            {{ item.subject }} 
          </span>
        </div>
        <div>
          <button 
            class="btn btn-danger btn-sm"
            @click.stop="openModal(item.id)"
          >
            Delete
          </button>
        </div>
      </div>
    </template>
  <!-- </div> -->
  </List>
  <teleport to='#modal'>
    <Modal 
      v-if="showModal"
      @close="closeModal" 
      @delete="deleteTodo"
    />
  </teleport>
</div>
</template>

<script>
import { useRouter } from 'vue-router'
import Modal from '@/components/DeleteModal.vue'
import { ref } from 'vue'
import List from '@/components/List.vue'

export default {
  components: {
    Modal,
    List,
  },
  props: {
    todos: {
      type: Array,
      required: true,
    }
  },
  emits: ['toggle-todo', 'delete-todo'],
  setup(props, { emit }) {

    
    const showModal = ref(false)
    const todoDeleteId = ref(null)
  
    const openModal = (id) => {
      todoDeleteId.value = id
      showModal.value = true
    }

    const closeModal = () => {
      todoDeleteId.value = null
      showModal.value = false
    }

    const deleteTodo = () => {
      emit('delete-todo', todoDeleteId.value)
      closeModal()
    }

    const toggleTodo = (index, event) => {
      emit('toggle-todo', index, event.target.checked)
    }

    

    const router = useRouter()

    const moveToPage = (todoId) => {
      router.push({
        name: 'Todo',
        params: {
          id: todoId
        }
      })
    }

    return {
      toggleTodo,
      deleteTodo,
      moveToPage,
      showModal,
      openModal,
      closeModal,
    }
  }
}
</script>

<style>

</style>