const app = new Vue({
  el: '#app',
  data: {
    title: 'Nest Chat',
    name: '',
    text: '',
    messages: [],
    socket: null,
  },
  methods: {
    sendMessage() {
      if (this.validInput()) {
        const message = {
          name: this.name,
          text: this.text,
        };
        this.socket.emit('message', message);
        this.text = '';
      }
    },
    receivedMessage(message) {
      this.messages.push(message);
    },
    validInput() {
      return this.name.length > 0 && this.text.length > 0;
    },
  },
  created() {
    this.socket = io('http://localhost:3000');
    this.socket.on('message', (message) => {
      this.receivedMessage(message);
    });
  },
});
