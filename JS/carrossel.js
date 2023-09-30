$(document).ready(function(){
    $('.carousel-container').slick({
        autoplay: true, // Ativar reprodução automática
        autoplaySpeed: 1000, // Tempo de exibição de cada slide (em milissegundos)
        arrows: true, // Exibir setas de navegação
        dots: true, // Exibir pontos indicadores
        prevArrow: '<button type="button" class="slick-prev">Anterior</button>',
        nextArrow: '<button type="button" class="slick-next">Próximo</button>',
        infinite: true, // Repetir o carrossel
        speed: 1000, // Velocidade da transição (em milissegundos)
        slidesToShow: 1, // Quantidade de slides visíveis
        slidesToScroll: 1, // Quantidade de slides para avançar/retroceder
        pauseOnHover: true, // Pausar a reprodução automática ao passar o mouse
    });
});
