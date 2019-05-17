<template>
  <div class="operativo" id="frameContainer">
    <div class="row valing-wrapper">
      <div class="col s12 center grey-text">
        <i class="mdi mdi-settings mdi-48px mdi-spin"></i>
        <p>Sin datos</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
    name: 'operativo',
    mounted() {
      let frameContainer = document.getElementById('frameContainer');
      let sizes = {
        width: window.innerWidth,
        height: window.innerHeight - ( window.innerHeight * 0.08 )
      }

    //   let dataFrame= `<iframe frameborder=0 
    //                           width="${ sizes.width }" 
    //                           height="${ sizes.height }" 
    //                           src="https://analytics.zoho.com/open-view/1945768000000340508/0c979cab04c16b3763b3cd1f176b6f96">
    //                   </iframe>`;

    //   frameContainer.innerHTML = dataFrame;
    }
}
</script>