window.onload = function(){
    //Pego no DOM os elementos que quero manipular
    const cep = document.getElementById('inCep');
    const endereco = document.getElementById('inEndereco');
    const bairro = document.getElementById('inBairro');
    const cidade = document.getElementById('inCidade');
    const spanErro = document.getElementById('erroCep');
    const esperaRequisicao = document.getElementById('esperaRequição');

    //Adiciono um ouvinte aonde quando o usuário tirar do foco o input do cep eu faço a requisição
    cep.addEventListener('focusout', async () =>{
        try{
            //Faço uma expressão regular até 8 números
            const validaCep = /^[0-9]{8}$/;

            //Caso não validar informo CEP inválido e um intervalo de 3 segundos
            if(!validaCep.test(cep.value)){
                spanErro.textContent = "CEP inválido!";

                setTimeout(function(){
                    spanErro.textContent = "";
                }, 3000)

                return;
            }

            //Faço uma mensagem de aguarde dizendo ao usuário que estamos esperando a requisição
            esperaRequisicao.textContent = "Aguardando a busca...";

            //Faço a requisição em async e await  
            const dadosCep = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`);
            const dadosLocal = await dadosCep.json();

            //Caso insira um CEP inválido retorno
            if(dadosLocal.logradouro == undefined){
                esperaRequisicao.textContent = "";
                spanErro.textContent = "CEP inválido!";
                setTimeout(function(){
                    spanErro.textContent = "";
                }, 3000);
                return;
            }
            
            //Limpo o aguarde e mostro ao usuário a resposta
            esperaRequisicao.textContent = "";
            endereco.removeAttribute('disabled');
            bairro.removeAttribute('disabled');
            cidade.removeAttribute('disabled');
            endereco.value = dadosLocal.logradouro;
            bairro.value = dadosLocal.bairro;
            cidade.value = dadosLocal.localidade;
        }
        catch(e){
            spanErro.textContent = "Erro ao buscar o CEP!";
        }
    })

    //Faço um ouvinte para limpar os dados
    document.getElementById('btnEnviar').addEventListener('click', () =>{
        cep.value = "";
        endereco.value = "";
        bairro.value = "";
        cidade.value = "";
        endereco.setAttribute('disabled', 'disabled');
        bairro.setAttribute('disabled', 'disabled');
        cidade.setAttribute('disabled', 'disabled');
    });
}