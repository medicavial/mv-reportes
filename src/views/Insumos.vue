<template>
  <div class="insumos" id="frameContainer">
    <div class="row valing-wrapper">
      <div class="col s12 center grey-text">
        <i class="mdi mdi-settings mdi-48px mdi-spin"></i>
      </div>
    </div>
  </div>
</template>

<script>

export default {
    name: 'insumos',
    mounted() {
      let frameContainer = document.getElementById('frameContainer');
      let sizes = {
        width: window.innerWidth,
        height: window.innerHeight - ( window.innerHeight * 0.08 )
      }

      let dataFrame = ` <iframe frameborder=0 
                                width="${ sizes.height }" 
                                height="600" 
                                src="https://analytics.zoho.com/open-view/1945768000000386094">
                        </iframe>
                      `;

      frameContainer.innerHTML = dataFrame;
    }
}
</script>