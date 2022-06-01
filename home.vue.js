const Home = { 
//Componente Home e declaração das variáveis de dados e validações dos formulários
    data(){
       return {
          nome:"",
          erroNome:"",
          cpf:null,
          listaMedicos:[],
          elementoCpf:null,
          cpfLista:[],
          confereCpf: false,
          celular:"",
          estados:[],
          estadoEscolhido:{},
          cidades:[],
          cidadeEscolhida:{},
          erroCPF:"",
        }
    },
    
    /*Observadores para atualização das cidades no formulário e atualização das validações do 
    nome e cpf*/
    watch:{
        estadoEscolhido(oldValue, newValue){
          this.getCidade();
        },
  
        nome(oldValue, newValue){
          this.erroNome="";
        },
  
        cpf(oldValue, newValue){
          if(this.confereCpf){
            this.confereCpf=false;
          }
        },
    },

    //Gancho para fazer a requisição dos estados e dos CPFs para a validação
    created() {
        this.getEstado();
        this.getCPF();    
    },


    methods:{
         
      proximo(){
        this.confereCpf = this.cpfLista.includes(this.cpf); 
        //Condicional para fazer a validação do nome e do CPF 
        if(this.nome.length<=3 || this.nome.length>48 || this.confereCpf ){
        if(this.nome.length<=3){
            this.erroNome = "Coloque seu nome completo";
        }
          if(this.nome.length>48){
            this.erroNome = "Abrevie seu nome";
  
          }
          }else{
            this.$emit('proximo',{nome: this.nome, path: '/atendimento', cpf: this.cpf, celular: this.celular, estado: this.estadoEscolhido.nome, cidade: this.cidadeEscolhida.nome})
          }
      },

      //Requisição do CPF
      getCPF(){
        axios
          .get("https://api-teste-front-end-fc.herokuapp.com/profissionais")
          .then((res) => {
             this.listaMedicos = res.data;
           })
           .catch((error) => {
             console.log(error);
           });
        },

      //Requisição dos estados
      getEstado() {
         axios
           .get("https://api-teste-front-end-fc.herokuapp.com/estados")
           .then((res) => {
             this.estados = res.data;
           })
           .catch((error) => {
             console.log(error);
           });
       },
  
      //Requisiçao das cidades
      getCidade() {
        axios
           .get(`https://api-teste-front-end-fc.herokuapp.com/cidades?estadoId=${this.estadoEscolhido.id}`)
           .then((res) => {
             this.cidades = res.data;
           })
           .catch((error) => {
             console.log(error);
           });
          
       },
  
      //Faz a iteração dos CPFs para formar somente um array para a validação e conferência.
      confereCpfCPF(){
        for(this.elementoCpf of this.listaMedicos){
              this.cpfLista.push(this.elementoCpf.cpf); 
        };
        
      },
    },
    
    //Template de home (Primeira página)
    template: `
      <section class="pagina1">
        <h1>Sobre o profissional</h1>
        <h2>Dados do profissional</h2>

        <div class="pagina1__imagem">
          <img src="img/desktop-pagina-1.png" alt="" >
        </div>

        <form>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label pagina1__nome">Nome Completo*</label>
            <input type="text" :style="erroNome!=''?'border-color: #DC3545;':''" class="pagina1__form-nome form-control "  placeholder="Digite o nome completo" v-model="nome">
            <!--Validação do nome-->
            <p class="pagina1__erro" v-cloak>{{erroNome}}</p>
          </div>

          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label pagina1__labelCPF">CPF*</label>
            <input :style="confereCpf?'border-color: #DC3545;':''" @click="confereCpfCPF" onkeypress="return event.charCode >= 48 && event.charCode <= 57" type="text" class="pagina1__form-cpf form-control "  placeholder="Digite um CPF"  v-model="cpf" onblur="formataCPF(this)" pattern="[0-9]{11}">
            <!--Validação do CPF-->
            <p class="pagina1__erro" v-if="confereCpf" style="margin-bottom: 30px;" v-cloak>CPF já cadastrado</p>
          </div>

          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Número de celular*</label>
            <input type="text" onkeypress="return event.charCode >= 48 && event.charCode <= 57" class="pagina1__form-cpf form-control "  v-model="celular" placeholder="Digite seu celular" onblur="formataCelular(this)" pattern="[0-9]{11}">
          </div>

          <span class="d-flex">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Estado*</label>
              <select class="form-select pagina1__estado" aria-label="Default select example" v-model="estadoEscolhido" >
                <option v-for="estado in estados" :value="estado" v-cloak>{{estado.nome}}</option>
              </select>
            </div>

            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Cidade*</label>
              <select class="form-select pagina1__estado" aria-label="Default select example" v-model="cidadeEscolhida" >
                <option v-for="cidade in cidades" :value="cidade" @click="getCidade" v-cloak>{{cidade.nome}}</option>
                </select>
            </div>
          </span>

          </form>

          <div class="d-flex" style="margin-bottom: 15px; margin-top: 30px;">
            <div class="pagina1__barra1"> </div>
            <div class="pagina1__barra2"> </div>
            <div style="color: #483698; font-size: 18px; margin-left: 15px;">1 de 2</div>
          </div>

          <botaoFacil @click="proximo"></botaoFacil>

      </section>` 
    }
      
      /*Função para a formatação do CPF e do telefone, se tivesse feito pelo CLI teria usado
      o The Mask*/

  function formataCPF(cpf) {
    const cpfAtual = cpf.value   
    let cpfFormatado;
    cpfFormatado = cpfAtual.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, 
  
  function( regex, argumento1, argumento2, argumento3, argumento4 ) {
    return argumento1 + '.' + argumento2 + '.' + argumento3 + '-' + argumento4;
  })  
    cpf.value = cpfFormatado; 
  }    
  
  function formataCelular(tel) {
    const telAtual = tel.value   
    let telFormatado;
    telFormatado = telAtual.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, 
  
  function( regex, argumento1, argumento2, argumento3, argumento4 ) {
    return '(' + argumento1 + ') ' + argumento2 + ' ' + argumento3 + '-' + argumento4 ;
  })  
    tel.value = telFormatado; 
  } 