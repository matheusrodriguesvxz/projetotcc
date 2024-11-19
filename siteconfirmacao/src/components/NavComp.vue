<template>  
<header>
    <nav>
        <img src="@/assets/logo.svg">
        <h1>EventEasy</h1>
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
h1{
    font-family: Poppins;
    color: white;
    justify-content: center;
    margin: auto;
    font-size: 30px;
}
nav{
    display: flex;
    align-items: center;

}
img{
    display: flex;
    justify-content: flex-start;
    width: 70px;
    position: relative;
}
</style>