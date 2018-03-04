<template>
  <div id="common">
    <Headers></Headers>
    <router-view></router-view>
    <Footers></Footers>
  </div>
</template>

<script>
import Headers from '@/packages/components/common/Headers'
import Footers from '@/packages/components/common/Footers'

export default {
  name: 'common',
  components: {
    Headers,
    Footers
  }
}
</script>
