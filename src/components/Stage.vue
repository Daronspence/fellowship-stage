<template>
    <div>
        <div class="bg-black p-4 text-2xl text-white uppercase mb-16 text-center">Stage</div>
        <div class="church-seats flex justify-center p-4">
            <div class="w-64 bg-black h-4 m-4 tilt-left"></div>
            <div class="w-64 bg-black h-4 m-4"></div>
            <div class="w-64 bg-black h-4 m-4"></div>
            <div class="w-64 bg-black h-4 m-4 tilt-right"></div>
        </div>
        <div class="church-seats flex justify-center p-8">
            <div class="w-64 bg-black h-4 m-4 tilt-left"></div>
            <div class="w-64 bg-black h-4 m-4"></div>
            <div class="w-64 bg-black h-4 m-4"></div>
            <div class="w-64 bg-black h-4 m-4 tilt-right"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.tilt-left {
  transform: rotate(5deg) translateY(-12px);
}

.tilt-right {
  transform: rotate(-5deg) translateY(-12px);
}
</style>
