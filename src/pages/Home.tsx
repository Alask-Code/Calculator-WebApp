import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ShieldCheck, Sparkles } from 'lucide-react'
import { calculators } from '../lib/calculations'
import { CalculatorCard } from '../components/CalculatorCard'
export function Home() {
  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <div className="pill">
            <span className="live-dot" /> Cinco ferramentas. Decisões mais claras.
          </div>
          <h1>
            Suas contas do dia a dia,
            <br />
            <em>mais simples.</em>
          </h1>
          <p>
            Calculadoras gratuitas, sem complicação. Faça as contas, entenda os resultados e siga em
            frente com mais confiança.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#ferramentas">
              Explorar calculadoras <ArrowRight size={17} />
            </a>
            <a className="text-button" href="#sobre">
              Conheça o projeto <ArrowDown size={15} />
            </a>
          </div>
          <div className="trust">
            <ShieldCheck size={16} />
            <span>Privado por natureza — seus cálculos ficam no seu navegador.</span>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="floating-card floating-small">
            <span className="mini-label">ECONOMIA NO MÊS</span>
            <strong>R$ 128,40</strong>
            <span className="positive">
              <ArrowUpRight size={13} /> 12,8%
            </span>
          </div>
          <div className="calculator-window">
            <div className="calc-window-title">
              <div className="tiny-dots">
                <i />
                <i />
                <i />
              </div>
              <span>porcentagem</span>
              <span>···</span>
            </div>
            <div className="screen-label">15% de 240</div>
            <div className="screen-value">
              36<span>,00</span>
            </div>
            <div className="keypad">
              <i>7</i>
              <i>8</i>
              <i>9</i>
              <i className="operator">÷</i>
              <i>4</i>
              <i>5</i>
              <i>6</i>
              <i className="operator">×</i>
              <i>1</i>
              <i>2</i>
              <i>3</i>
              <i className="operator">−</i>
              <i>0</i>
              <i>,</i>
              <i className="equals">=</i>
              <i className="operator">+</i>
            </div>
          </div>
          <div className="floating-card floating-note">
            <span className="note-check">
              <Check size={15} />
            </span>
            <div>
              <strong>Conta certa.</strong>
              <span>Pronto para decidir.</span>
            </div>
            <Sparkles size={17} className="sparkle" />
          </div>
          <div className="art-caption">
            Um passo de cada vez<span>✳</span>
          </div>
        </div>
        <div className="hero-scroll">
          <span>ROLE PARA DESCOBRIR</span>
          <span className="scroll-line" />
        </div>
      </section>
      <section className="tools-section" id="ferramentas">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">FERRAMENTAS PARA VOCÊ</span>
              <h2>O que vamos calcular?</h2>
              <p>Escolha uma ferramenta e resolva em poucos passos.</p>
            </div>
            <span className="count-pill">
              05 calculadoras <span>↘</span>
            </span>
          </div>
          <div className="card-grid">
            {calculators.map((item) => (
              <CalculatorCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
      <section className="about-section" id="sobre">
        <div className="wrap about-grid">
          <div>
            <span className="eyebrow">SIMPLES ASSIM</span>
            <h2>
              Feito para ajudar.
              <br />
              <em>Sem complicar.</em>
            </h2>
            <p>
              Sem cadastro, sem taxas escondidas e sem fórmulas misteriosas. Cada ferramenta explica
              o que está calculando para você tomar decisões mais informadas.
            </p>
            <Link className="button dark-button" to="/calculadora/orcamento">
              Comece pelo orçamento <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="about-points">
            <div>
              <span>01</span>
              <div>
                <strong>Seus dados são seus</strong>
                <p>
                  As contas são feitas localmente no seu dispositivo. Nenhum dado financeiro é
                  enviado a servidores.
                </p>
              </div>
            </div>
            <div>
              <span>02</span>
              <div>
                <strong>Transparência em cada conta</strong>
                <p>
                  Fórmulas, unidades e premissas sempre à vista. Você entende de onde vem cada
                  resultado.
                </p>
              </div>
            </div>
            <div>
              <span>03</span>
              <div>
                <strong>Gratuito e acessível</strong>
                <p>
                  Use no celular ou no computador, com navegação simples e sem precisar criar uma
                  conta.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="faq-section" id="faq-home">
        <div className="wrap faq-home">
          <div>
            <span className="eyebrow">PERGUNTAS FREQUENTES</span>
            <h2>Uma dúvida rápida?</h2>
          </div>
          <details>
            <summary>
              As calculadoras são gratuitas? <span>+</span>
            </summary>
            <p>Sim. Todas as ferramentas podem ser usadas gratuitamente, sem cadastro.</p>
          </details>
          <details>
            <summary>
              Meus dados são salvos? <span>+</span>
            </summary>
            <p>
              Os valores digitados são processados no seu navegador e não são enviados para um
              servidor.
            </p>
          </details>
          <details>
            <summary>
              Posso confiar nos resultados? <span>+</span>
            </summary>
            <p>
              Os cálculos usam fórmulas matemáticas explícitas. Os resultados são estimativas e
              devem ser conferidos quando houver implicações profissionais.
            </p>
          </details>
        </div>
      </section>
    </>
  )
}
