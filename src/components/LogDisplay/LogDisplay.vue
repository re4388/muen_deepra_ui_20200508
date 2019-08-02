<template>
  <div class="log-display">
    <pre class="display-section">
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
        this.logStash.push(this.content)
        return this.logStash.join('\n')
      } else {
        return ''
      }
    }
  },
  data () {
    return {
      maxLines: 1000,
      logStash: []
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
