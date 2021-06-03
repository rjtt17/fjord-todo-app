const app = new Vue({
  el: '#app',
  data: {
    content: '',
    showContent: false,
    editingIds: [],
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
        content: this.content
      })
      this.save()
      this.content = ''
    },
    remove (index) {
      this.lists.splice(index, 1)
      this.save()
    },
    edit (index) {
      this.lists.splice(index, 1, {
        id: this.lists[index].id,
        content: this.lists[index].content
      })
      this.editingIds.push(this.lists[index].id)
    },
    update (index) {
      this.lists.splice(index, 1, {
        id: this.lists[index].id,
        content: this.lists[index].content
      })
      this.save()
      this.editingIds = this.editingIds.filter(editingId => editingId !== this.lists[index].id)
    },
    save () {
      const parsed = JSON.stringify(this.lists)
      localStorage.setItem('lists', parsed)
    }
  }
})
