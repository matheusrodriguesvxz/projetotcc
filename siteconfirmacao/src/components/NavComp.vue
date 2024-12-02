<template>  
<header>
    <nav>
        <h1>EventEasy</h1>
    </nav>
</header>
</template>
<script>
export default {
    name: 'NavPage'
}
</script>

<style>

h1{
    margin: 1% 2%;
    font-family: Poppins;
    color: white;
    justify-content: center;
    font-size: 30px;
    text-align: center;
}
nav h1{
    display: flex;
}
img{
    display: flex;
    justify-content: center;
    
    margin: 1%;
    width: 5%;
}


@media (max-width: 768px) {
    nav h1{
    display: flex;
    align-items: center;
    justify-items: center;
}
}

@media (max-width: 480px) {
    nav h1{
    display: flex;
    align-items: center;
    justify-items: center;
}
}
</style>