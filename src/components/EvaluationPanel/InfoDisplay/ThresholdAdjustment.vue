<template>
  <div>
    <div class="m-3">
      <h2>All table</h2>


      <table class="table table-dark table-borderless">
        <tbody>
          <tr>
            <td>Score Threshold</td>
            <td>
              <form class="range-field my-1 w-25">
                <input type="range" min="0" max="1" step="0.01" />
              </form>
            </td>
          </tr>
          <tr>
            <td>Total Image</td>
            <td>3667</td>
          </tr>
          <tr>
            <td>Precision</td>
            <td>98.5%</td>
          </tr>
          <tr>
            <td>Recall</td>
            <td>91.4%</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'ThresholdAdjustment',
    data() {
      return {

      }
    }
  }

</script>

<style scoped>
</style>
