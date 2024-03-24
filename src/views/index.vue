<template>
  <div class="index">
    <el-switch v-model="isActive" active-color="#13ce66" inactive-color="#ff4949">
      switch
    </el-switch>
  </div>
</template>

<script lang="ts">
import { ElSwitch } from 'element-plus';
import 'element-plus/theme-chalk/el-switch.css';
import { ref } from 'vue';

export default {
  name: 'Index',
  components: {
    ElSwitch
  },
  setup() {
    const isActive = ref(false);
    return { isActive };
  }
};
</script>
