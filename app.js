const app = new Vue({
  el: '#app',
  data: {
    content: '',
    editContent: '',
    showContent: false,
    lists: []
  },
  mounted () {
    if (localStorage.getItem('lists')) {
      try {
        this.lists = JSON.parse(localStorage.getItem('lists'))
      } catch (e) {
        localStorage.removeItem('lists')
      }
    }
  },
  methods: {
    add () {
      const max = this.lists.reduce(function (a, b) {
        return a.id > b.id ? a.id : b.id
      }, 0)
      this.lists.push({
        id: max + 1,
        content: this.content,
        isEdit: false
      })
      this.save()
      this.content = ''
    },
    remove (index) {
      this.lists.splice(index, 1)
      this.save()
    },
    edit (index) {
      if (this.lists.some(list => list.isEdit === true)) {
        this.openModal()
      } else {
        this.lists.splice(index, 1, {
          id: this.lists[index].id,
          content: this.lists[index].content,
          isEdit: true
        })
        this.editContent = this.lists[index].content
      }
    },
    update (index) {
      this.lists.splice(index, 1, {
        id: this.lists[index].id,
        content: this.editContent,
        isEdit: false
      })
      this.save()
      this.editContent = ''
    },
    save () {
      const parsed = JSON.stringify(this.lists)
      localStorage.setItem('lists', parsed)
    },
    openModal () {
      this.showContent = true
    },
    closeModal () {
      this.showContent = false
    }
  }
})
