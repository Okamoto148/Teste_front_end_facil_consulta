//Constante do componente principal
const app = {

    components: {
      Atendimento,
      Home,
      Cadastro
    },
  
    //Template do componente principal.
    
    template:  
      `<!--Aqui está as transmissões do $emit-->
      <router-view @proximo="proximo" @proximo2="proximo2" v-if="!revisao"></router-view>
      <div v-if="revisao" v-cloak>
        <div class="botao" @click="voltar">
          <img src="img/print-botao-voltar.png"  alt="" >
        </div>
  
      <section class="pagina1 pagina2">
        <h1>Revisão do cadastro</h1>
        <div class="pagina1__imagem">
          <img src="img/desktop-pagina-3.png" alt="" >
        </div>
  
        <p class="pagina3__titulo">Nome completo</p>
        <p class="pagina3__dado">{{dadosPagina1.nome}}</p>
            
        <p class="pagina3__titulo-cpf">CPF</p>
        <p class="pagina3__dado">{{cpf1}}.{{cpf2}}.{{cpf3}}-{{cpf4}}</p>
        
  
        <p class="pagina3__titulo-cpf">Número do celular ou telefone</p>
        <p class="pagina3__dado">({{celular1}}) {{celular2}} {{celular3}}-{{celular4}}</p>
        
  
        <p class="pagina3__titulo-cpf">Estado/Cidade</p>
        <p class="pagina3__dado">{{dadosPagina1.estado}} - {{dadosPagina1.cidade}}</p>
  
        <p class="pagina3__titulo-cpf">Especialidade principal</p>
        <p class="pagina3__dado">{{dadosPagina2.especialidade}}</p>
  
        <p class="pagina3__titulo-cpf">Preço da consulta</p>
        <p class="pagina3__dado">R$ {{dadosPagina2.valorConsulta}}</p>
  
        <p class="pagina3__titulo-cpf">Formas de pagamento da consulta</p>
        <p class="pagina3__dado" v-if="dadosPagina2.cartao">Cartão de crédito - parcelamento em {{dadosPagina2.parcelamento}}</p>
        <p class="pagina3__dado" v-if="dadosPagina2.pix">Pix</p>
        <p class="pagina3__dado" v-if="dadosPagina2.dinheiro">Dinheiro</p>
  
  
  
        <button @click="proximo4" class="pagina3__botao">CADASTRAR PROFISSIONAL</button>
        <div class="pagina3__editar"  @click="editar">Editar cadastro</div>`,
  
    //Gancho para formatar o celular e o cpf
    watch:{
      dadosPagina1(oldValue, newValue){
        this.cpf1 = this.dadosPagina1.cpf.slice(0,3);
        this.cpf2 = this.dadosPagina1.cpf.slice(3,6);
        this.cpf3 = this.dadosPagina1.cpf.slice(6,9);
        this.cpf4 = this.dadosPagina1.cpf.slice(9,11);

        this.celular1 = this.dadosPagina1.celular.slice(0,2);
        this.celular2 = this.dadosPagina1.celular.slice(2,3);
        this.celular3 = this.dadosPagina1.celular.slice(3,7);
        this.celular4 = this.dadosPagina1.celular.slice(7,11);
        
      }
    },

    //recebimento dos dados dos componentes filhos
    data(){
      return{
        dadosPagina1:{},
        dadosPagina2:{},
        revisao: false,
        cpf1:"",
        cpf2:"",
        cpf3:"",
        cpf4:"",
        celular1:"",
        celular2:"",
        celular3:"",
        celular4:"",
      }
    },
  
  
    //recebimento dos dados e uso do router pelos botões nos templates.
    methods:{
      proximo(dadosPagina1){
        this.dadosPagina1 = dadosPagina1;
        this.$router.push(dadosPagina1.path);
      },
      
      proximo2(dadosPagina2){
        this.dadosPagina2 = dadosPagina2;
        this.$router.push(dadosPagina2.path);
        this.revisao=true;
      },
  
      proximo4(){
        this.$router.push('/cadastro');
        this.revisao=false;
      },
  
      voltar(){
        this.revisao=false;
        this.$router.push('/atendimento');
      },
  
      editar(){
        this.$router.push('/');
        this.revisao=false;
      },
          },   
  }