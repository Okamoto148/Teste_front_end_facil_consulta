const Cadastro = {
//Componente última página
  data(){
    return {
      opacidade:false,
    }
  },

  methods:{
    opacity(){
      this.opacidade=true;
    },
  },


    template: `
    <section class="pagina4" @mouseover="opacity" :style="this.opacidade?'opacity: 1; transition: 8s':''">
    	<div class="pagina4__texto">
    		<h1>Parabéns!</h1>
    		<h2 class="pagina4__paragrafo">Você acabou de se cadastrar no Fácil Consulta.</h2>
    		<img class = "pagina4__img"  src="img/Pagina4.jpg"  alt="" >
    		<p class="pagina4__paragrafo">Em breve entraremos em contato.</p>
    		<p class="pagina4__paragrafo">

        O Fácil Consulta é uma Startup Pelotense que resolve o problema de milhares 
        de pessoas quando o assunto é saúde! Através de nossa plataforma os pacientes 
        escolhem o médico e horário que preferirem, agendam sua consulta de forma rápida, 
        fácil e segura, e além disso, economizam até 60% no valor da consulta. Assim, 
        viemos cumprindo a nossa missão de oferecer uma experiencia completamente 
        diferenciada para todos que procuram por um médico especialista(e infelizmente
        estão acostumados a enfrentar inúmeros problemas para conseguir).</p>
			</div>
        

    	<a style="font-size: 10px;" href='https://br.freepik.com/fotos-vetores-gratis/equipe-hospital'>Equipe hospital vetor criado por pch.vector - br.freepik.com</a>
    </section>`
};