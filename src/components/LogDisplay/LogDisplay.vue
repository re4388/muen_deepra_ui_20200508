<template>
  <div class="log-display" id="log-display">
    <pre class="display-section" id="display-section">
      <code class="log-content">{{logContent}}</code>
    </pre>
  </div>
</template>

<script>
export default {
  name: 'LogDisplay',
  props: {
    content: String
  },
  methods: {
  },
  computed: {
    logContent () {
      if (this.content !== '') {
        if (this.logStash.length == this.stashSize) {
          this.logStash.splice(0, this.sizeToClear)
        }
        this.logStash.push(this.content)

        // Auto scroll to bottom
        var el = document.getElementById('log-display')
        var isScrollToBottom = el.scrollHeight - el.clientHeight - 21 <= el.scrollTop + 1
        if (isScrollToBottom) {
          el.scrollTop = el.scrollHeight - el.clientHeight
        }

        return this.logStash.join('\n')
      } else {
        return ''
      }
    }
  },
  data () {
    return {
      stashSize: 2000,
      logStash: [],
      sizeToClear: 500,
      keepScroll: true,
    }
  }
}
</script>

<style lang="scss" scoped>
.log-display {
  background-color: rgba(0, 0, 0, 0.7);
  font-family: "Lucida Console";
  text-align: left;
  padding: 0.5rem;
  border-radius: 10px;
}
pre, code {
  white-space: pre-line;
  color: green;
}
</style>
