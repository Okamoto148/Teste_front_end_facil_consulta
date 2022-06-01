const Atendimento = {
  //Componente do cadastro de atendimento, variáveis dos dados do formulário.
  data(){
    return {
      especialidades:[],
      especialidade: "",
      valorConsulta: "",
      cartao: false,
      pix:false,
      dinheiro:false,
      parcelamento:"",
      dadosPagina1:{},
    }
  },

  //Gancho para a requisição da especialidade.
  created() {
    this.getEspecialidade();      
  },

  //Transmissão de dados para o componente pai.
  methods:{
    proximo2(){
      this.$emit('proximo2',{especialidade: this.especialidade, path: '/', valorConsulta: this.valorConsulta, cartao: this.cartao, pix:this.pix, dinheiro: this.dinheiro, parcelamento: this.parcelamento})
    },

    //Requisição da especialidade
    getEspecialidade(){
      axios
       .get("https://api-teste-front-end-fc.herokuapp.com/especialidades")
       .then((res) => {
         this.especialidades = res.data;
       })
       .catch((error) => {
         console.log(error);
       });
    },
    },

    //Template do componente
    template: `
    <!--Botão de volta-->
      <div class="botao">
        <router-link to="/"><img src="img/print-botao-voltar.png"  alt=""></router-link>
      </div>

    <section class="pagina1 pagina2">
      <h1>Sobre o atendimento</h1>
      <h2>Detalhes do atendimento</h2>

      <div class="pagina1__imagem">
        <img src="img/desktop-pagina-2.png" alt="" >
      </div>

      <form class="pagina2__form">
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Especialidade principal*</label>
          <select class="form-select pagina2__especialidade" aria-label="Default select example" v-cloak v-model="especialidade" >
            <option v-for="especialidade in especialidades" :value="especialidade.nome" >{{especialidade.nome}}</option>
          </select>
        </div>

        <div class="mb-3 ">
          <div class="pagina2__valor-label"><p class="form-label ">Informe preço da consulta*</p>
            <div class="pagina2__valor-input"><span class="input-group-text pagina2__valor-span" :style="valorConsulta>=10 && valorConsulta<30||valorConsulta>350?'border-color: #DC3545;':''" id="basic-addon1">R$</span>
              <input type="number" :style="valorConsulta>=10 && valorConsulta<30||valorConsulta>350?'border-color: #DC3545;':''" class="form-control pagina2__valor-input2" v-model="valorConsulta" placeholder="Valor" onkeypress="return event.charCode >= 48 && event.charCode <= 57 || event.charCode==44"  >
            </div>
          </div>
        </div>
        <!--Validação do valor-->
        <p class="pagina2__erro" v-if="valorConsulta>=10 && valorConsulta<30 || valorConsulta>350" v-cloak>O valor da consulta deve estar entre R$ 30,00 e R$ 350,00.</p>

        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Formas de pagamento da consulta*</label>
          <div class="form-control pagina2__formas-pagamento"><input class="form-check-input pagina2__input" type="checkbox" v-model="dinheiro">
            <label class="form-check-label pagina2__label" for="flexCheckDefault">
              Em dinheiro
            </label>
          </div>   

        <div class="form-control pagina2__formas-pagamento">
          <input class="form-check-input pagina2__input" type="checkbox" v-model="pix">
          <label class="form-check-label pagina2__label" for="flexCheckDefault">
            Pix
          </label>
        </div>    

        <div class="form-control pagina2__check-cartao pagina2__formas-pagamento">
          <span><input class="form-check-input pagina2__input" v-model="cartao" type="checkbox">
            <label class="form-check-label pagina2__label"  for="flexCheckDefault">
              Cartão de crédito
            </label>
          </span>

        <div v-if="cartao" class="pagina2__radio">
          <p style="margin-bottom: 25px; margin-top: 25px;">Parcelamento em</p>
          <div class="form-check pagina2__radio2">
            <input class="form-check-input" type="radio" name="parcelamento" v-model="parcelamento" value="1x sem juros" >
            <label class="form-check-label" for="flexRadioDefault1">
              1x, sem juros
            </label>
          </div>

          <div class="form-check pagina2__radio2">
            <input class="form-check-input" type="radio" name="parcelamento" v-model="parcelamento" value="2x sem juros">
            <label class="form-check-label" for="flexRadioDefault1">
              2x, sem juros
            </label>
          </div>

          <div class="form-check pagina2__radio2">
            <input class="form-check-input" type="radio" name="parcelamento" v-model="parcelamento" value="3x sem juros">
            <label class="form-check-label" for="flexRadioDefault1">
                3x, sem juros
            </label>
          </div>
        </div>
      </div>    
      </div>
      

      <div class="d-flex" style="margin-bottom: 15px; margin-top: 50px;">
        <div class="pagina1__barra1"> </div>
        <div class="pagina2__barra2"> </div>
        <div style="color: #483698; font-size: 18px; margin-left: 15px;">2 de 2</div>
      </div>

      <botaoFacil class="pagina1__button" @click="proximo2">PRÓXIMO</botaoFacil>`
};