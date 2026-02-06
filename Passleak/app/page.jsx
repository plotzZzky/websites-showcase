'use client'
import { useState } from "react";
import checkMyPwd from "@comps/hash";
import faq from '@comps/faq.json'


export default function PassLeak() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
  const siteDesc = process.env.NEXT_PUBLIC_SITE_DESC;

  const [getPwd, setPwd] = useState("");
  const [getPwdTIP, setPwdTip] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  function handlePwd(event) {
    // Altera o valor do setPwd sempre que algo for digitado no input
    const value = event.target.value;
    setPwd(value);
  };

  async function checkPwd() {
    // Verifica se a senha foi vazada
    if (getPwd) {
      const result = await checkMyPwd(getPwd);
      setPwdTip(result);
      setShowMsg(true);
    }
  };
  
  const FAQ_ITEMS = () => {
    // Cria os details com as informações do faq
    return faq.map(({question, answer}, index) => (
      <details key={index}>
        <summary> {question} </summary>
        <p> {answer} </p>
      </details>
    ))
  };

  const PASSWORD_TIP = () => {
    if (showMsg) {
      let title = getPwdTIP? "Senha vazada" : "Senha não vazada"
      let desc = getPwdTIP? "Sua senha já consta no nosso banco de dados, por isso troque a imediatamente por uma mais segura e ative a autenticação em duas etapas (2FA)." :
      "Sua senha ainda não consta em nossos bancos de dados."

      return (
        <>
          <h2> {title} </h2>
          <h3>
              {desc}
          </h3>
        </>
      )
    }
  };

  return (
    <>
      <section id='Find'>
        
        <h1> {siteName} </h1>
        <h2 id='subtitle'> {siteDesc} </h2>

        <div className='input-div'>
          <input type="text" value={getPwd} onChange={handlePwd} placeholder="Digite sua senha..." />
          <button onClick={checkPwd}> Verificar </button>
        </div>

        {PASSWORD_TIP()}

        <h3 className='disclaimer'>
          Nosso serviço verifica sua senha em bases de dados de vazamentos conhecidos sem armazenar ou registrar qualquer informação sensível.
        </h3>

      </section>

      <section id="Tip">
        <h2> Dicas sobre senhas: </h2>

        <p>
          - Use pelo menos 12 caracteres, incluindo números, letras (maiúsculas e minúsculas) e símbolos.
        </p>

        <p>
          - Nunca use informações pessoais óbvias (como nome, data de nascimento, etc.).
        </p>

        <p>
          - Evite usar palavras comuns da sua língua ou de outras.
        </p>  

        <p>
          - Considere mudar as suas senhas mais importantes com frequência, a cada 90 dias é um otimo.
        </p> 

        <p>
          - Habilite a autenticação em 2 etapas (2FA), se possivel, use softwares livres como <a href="https://getaegis.app/">Aegis</a>.
        </p>
                  
        <p>
          - Considere usar um gerenciador de senhas para armazenar senhas longas e únicas para cada serviço.
        </p>
      </section>

      <section id='Faq'>
        <h2> Duvias frequentes: </h2>

        <div className='div-faq'>
          {FAQ_ITEMS()}


          <details key={7} style={{"width": '60%'}}>
            <summary>
              Como posso criar uma senha segura?
            </summary>
              <p>
                - Use pelo menos 12 caracteres, incluindo números, letras (maiúsculas e minúsculas) e símbolos.
              </p>

              <p>
                - Nunca use informações pessoais óbvias (como nome, data de nascimento, etc.).
              </p>

              <p>
                - Evite usar palavras comuns da sua língua ou de outras.
              </p>   
                        
              <p>
                - Considere usar um gerenciador de senhas para armazenar senhas longas e únicas para cada serviço.
              </p>
          </details>
        </div>

      </section>
    </>
  )
}