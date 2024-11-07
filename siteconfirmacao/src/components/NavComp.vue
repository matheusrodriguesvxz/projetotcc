<template>  
<header>
    <nav>
        <img src="@/assets/logo.svg">
        <h2>EventEasy</h2>
    </nav>
</header>
</template>
<script>
export default {
    name: 'NavPage'
}
</script>

<style scoped>

header{
    background-image: url(../assets/PurpleWallpaper.png);
    /* background-repeat: no-repeat; */
    padding-top: 20px;
    padding-bottom: 20px;
    padding: 20px;
    
}
h2{
    color: white;
    justify-content: center;
    margin: auto;
    margin-bottom: 30px;
}
nav{
    display: flex;
    align-items: center;

}
img{
    width: 5%;  
    position: fixed;
}
</style>