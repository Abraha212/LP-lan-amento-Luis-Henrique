"use client";

import Image from "next/image";
import { useState } from "react";

const BUY = "https://pay.hotmart.com/A105059658Y?checkoutMode=10";
const PAD = "padding: 100px clamp(24px, 6vw, 100px)";

/* ── Icons ── */
const Ico = {
  arrow: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>),
  check: (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>),
  x: (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>),
  shield: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg>),
  book: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>),
  target: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>),
  micro: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18h12M8 22H16M9 6l1.5 8h3L15 6M8 2h8M12 2v4" /><circle cx="12" cy="13" r="1" /></svg>),
  flask: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6M10 3v6l-4 9a1 1 0 0 0 .9 1.4h10.2a1 1 0 0 0 .9-1.4L14 9V3" /><path d="M8.5 15h7" /></svg>),
  pill: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" /><path d="m8.5 8.5 7 7" /></svg>),
  list: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>),
};

const MODULES = [
  { icon: Ico.book, title: "Super E-book Didático", desc: "Um manual completo escrito do jeito que eu falaria com você no consultório — sem terrorismo, sem linguagem de bula, sem rodeio." },
  { icon: Ico.target, title: "Causas", desc: "Físicas, psicológicas, hormonais, vasculares — você vai identificar exatamente onde está o seu problema." },
  { icon: Ico.micro, title: "Diagnóstico", desc: "Quais exames são necessários, para que servem e como interpretar os resultados." },
  { icon: Ico.flask, title: "Exames", desc: "O que cada exame revela e por que alguns são pedidos e outros não." },
  { icon: Ico.pill, title: "Tratamento", desc: "As abordagens mais eficazes hoje, com e sem medicamento. Informação para decidir com a cabeça no lugar." },
  { icon: Ico.list, title: "Orientações", desc: "Mudanças práticas de estilo de vida com impacto real, baseadas em evidência clínica." },
];

const FAQS = [
  { q: "É seguro comprar? Alguém vai saber?", a: "A compra é feita pela Hotmart, uma das maiores plataformas do Brasil. A cobrança aparece de forma discreta no extrato — sem nome do produto. O acesso é 100% digital. Ninguém precisa saber." },
  { q: "Funciona pra qualquer idade?", a: "O conteúdo abrange homens de diferentes faixas etárias e causas diferentes. Tanto para quem está tendo os primeiros episódios quanto para quem convive com o problema há anos." },
  { q: "E se eu não gostar?", a: "Você tem 7 dias de garantia. Assistiu, não curtiu, é só pedir o reembolso. Sem questionamento, sem processo, sem enrolação." },
  { q: "Isso substitui uma consulta médica?", a: "Não. O curso oferece conhecimento aprofundado e preparo para agir — mas não substitui consulta médica, especialmente para diagnóstico inicial ou casos que precisem de intervenção específica." },
];

function Eyebrow({ text, light }: { text: string; light?: boolean }) {
  return (
    <p style={{
      fontFamily: "var(--font-inter)", fontSize: 11, fontWeight: 600,
      letterSpacing: "0.16em", textTransform: "uppercase",
      color: light ? "var(--gold)" : "var(--blue)",
      marginBottom: 14,
    }}>{text}</p>
  );
}

function CTA({ dark }: { dark?: boolean }) {
  return (
    <div style={{ maxWidth: 460, margin: "0 auto" }}>
      <a href={BUY} className="btn btn-ring">{Ico.arrow} QUERO RESOLVER ISSO AGORA</a>
      <p style={{
        marginTop: 12, textAlign: "center",
        fontFamily: "var(--font-inter)", fontSize: 11,
        letterSpacing: "0.05em",
        color: dark ? "rgba(100,136,168,0.8)" : "#8aa0b8",
      }}>
        Acesso imediato · R$&nbsp;197 · Garantia de 7 dias · Compra discreta
      </p>
    </div>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #dde5ef" }}>
      <button onClick={() => setOpen(p => !p)} style={{
        width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
        gap: 16, padding: "22px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left",
      }}>
        <span style={{
          fontFamily: "var(--font-inter)", fontSize: 15, fontWeight: 600, lineHeight: 1.4,
          color: open ? "#044982" : "#0d1c2e", transition: "color .25s",
        }}>{q}</span>
        <span style={{
          flexShrink: 0, fontSize: 22, fontWeight: 300, color: "#044982", lineHeight: 1,
          transform: open ? "rotate(45deg)" : "none", transition: "transform .25s", display: "block",
        }}>+</span>
      </button>
      {open && (
        <p style={{
          fontFamily: "var(--font-inter)", fontSize: 14, lineHeight: 1.85,
          color: "#354f6b", paddingBottom: 22,
        }}>{a}</p>
      )}
    </div>
  );
}

const sp = "100px clamp(24px, 6vw, 100px)";

export default function Page() {
  return (
    <main style={{ fontFamily: "var(--font-inter)" }}>

      {/* ═══ HERO ══════════════════════════════════════════ */}
      <section className="hero-section" style={{
        minHeight: "100vh",
        background: "linear-gradient(155deg, #030d1e 0%, #062040 55%, #044982 100%)",
        position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center",
      }}>
        {/* Foto do Dr. Luis — lado direito com mask-image para difusão real */}
        <div className="hero-photo" style={{
          position: "absolute", top: 0, right: 0, bottom: 0,
          width: "58%",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, transparent 5%, rgba(0,0,0,0.1) 15%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.9) 70%, black 85%), linear-gradient(to bottom, transparent, black 15%, black 80%, transparent), linear-gradient(to top, transparent, black 20%, black 100%)",
          WebkitMaskComposite: "destination-in",
          maskImage: "linear-gradient(to right, transparent 0%, transparent 5%, rgba(0,0,0,0.1) 15%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.9) 70%, black 85%)",
          maskComposite: "intersect",
        }}>
          <Image
            src="/dr-luis-palco.jpg"
            alt="Dr. Luis Henrique em palestra"
            fill
            style={{ objectFit: "cover", objectPosition: "center center" }}
            priority
          />
        </div>

        {/* Glows decorativos */}
        <div style={{ position: "absolute", top: "-15%", right: "-8%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(4,73,130,0.3) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-5%", left: "20%", width: 500, height: 350, background: "radial-gradient(ellipse, rgba(205,161,2,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: "linear-gradient(to bottom, transparent, #030d1e)", pointerEvents: "none", zIndex: 1 }} />

        {/* Conteúdo — alinhado com as seções abaixo */}
        <div className="hero-content" style={{
          position: "relative", zIndex: 2,
          width: "100%", maxWidth: 800,
          padding: "clamp(100px, 14vh, 160px) clamp(24px, 6vw, 100px)",
          marginLeft: "calc(clamp(24px, 6vw, 100px) + 50px)",
        }}>
          <p style={{
            fontFamily: "var(--font-inter)", fontSize: 11, fontWeight: 600,
            letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)",
            marginBottom: 28, display: "flex", alignItems: "center", gap: 10,
          }}>
            <span className="pdot" style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", boxShadow: "0 0 8px var(--gold)" }} />
            Dr. Luis Henrique — Urologista &amp; Andrologista
          </p>

          <h1 style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(28px, 4vw, 50px)",
            fontWeight: 800, lineHeight: 1.15,
            color: "#f0f5fc", letterSpacing: "-0.02em",
            marginBottom: 24,
          }}>
            Se a banana não tá subindo, o problema{" "}
            <span style={{ color: "var(--gold)", fontStyle: "italic" }}>pode não ser ela.</span>
          </h1>

          <p style={{
            fontSize: "clamp(14px, 1.3vw, 16px)", lineHeight: 1.8,
            color: "#7a9ab8", maxWidth: 460, marginBottom: 40,
          }}>
            Em menos de 2 horas você vai entender mais sobre disfunção erétil
            do que em 10 anos de Google — com um urologista que já atendeu
            milhares de homens com esse problema.
          </p>

          <div style={{ maxWidth: 380 }}>
            <CTA dark />
          </div>
        </div>
      </section>

      {/* ═══ VÍDEO DE VENDAS ══════════════════════════════ */}
      <section style={{
        background: "linear-gradient(180deg, #030d1e 0%, #071828 100%)",
        padding: sp, textAlign: "center",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Eyebrow text="Assista antes de decidir" light />
          <h2 style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(24px, 3.5vw, 38px)",
            fontWeight: 800, lineHeight: 1.25, color: "#f0f5fc",
            marginBottom: 40,
          }}>
            Entenda por que esse curso pode mudar a sua vida
          </h2>
          <div style={{
            position: "relative",
            width: "100%",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.08)",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          }}>
            <video
              controls
              autoPlay
              muted
              playsInline
              preload="auto"
              style={{ width: "100%", display: "block", borderRadius: 12 }}
            >
              <source src="/vsl-dr-luis.mp4" type="video/mp4" />
              Seu navegador não suporta vídeo.
            </video>
          </div>
        </div>
      </section>

      {/* ═══ IDENTIFICAÇÃO ═════════════════════════════════ */}
      <section style={{ background: "#fff", padding: sp }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <Eyebrow text="Identificação" />
          <h2 style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(28px, 3.5vw, 42px)",
            fontWeight: 800, lineHeight: 1.2, color: "#0d1c2e",
            marginBottom: 56,
          }}>
            Você se reconhece em alguma{" "}
            <span style={{ color: "var(--blue)" }}>dessas situações?</span>
          </h2>
        </div>

        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", flexDirection: "column" }}>
          {[
            "Chegou nos 40 e o amigo já não responde igual antes. Você acha que é da idade e vai ter que aceitar assim.",
            "Falhou uma vez. Aí entrou naquele ciclo: a próxima vez começa a ansiedade antes mesmo de chegar na hora H.",
            "Toma o azulzinho escondido. Funciona na hora, mas você sabe que não tá resolvendo nada — e tem vergonha disso.",
            "Sua mulher acha que você perdeu o interesse nela. Você evita a intimidade antes de ter que explicar o que não sabe explicar.",
            "Já pesquisou tudo no Google. Quanto mais lê, mais confuso fica. Cada site fala uma coisa diferente.",
            "Não teve coragem de falar com um médico sobre isso. É o tipo de assunto que a gente fica guardando.",
          ].map((text, i) => (
            <div key={i} style={{
              display: "flex", gap: 24, padding: "28px 0",
              borderBottom: "1px solid #e8eef5", alignItems: "flex-start",
            }}>
              <span style={{
                flexShrink: 0,
                fontFamily: "var(--font-playfair)", fontSize: 28, fontWeight: 800,
                color: "#dce6f0", lineHeight: 1, marginTop: 4, minWidth: 36,
              }}>{String(i + 1).padStart(2, "0")}</span>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: "#354f6b", fontStyle: "italic" }}>
                &ldquo;{text}&rdquo;
              </p>
            </div>
          ))}

          <div style={{ padding: "36px 0 0" }}>
            <p style={{
              fontSize: 16, lineHeight: 1.8, color: "#0d1c2e", fontWeight: 500,
              borderLeft: "3px solid var(--blue)", paddingLeft: 20,
            }}>
              Se você se identificou com pelo menos duas dessas situações, preste atenção no que vem a seguir.{" "}
              <span style={{ color: "var(--blue)" }}>O problema quase nunca é o que você está pensando.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ═══ ABSOLVIÇÃO ════════════════════════════════════ */}
      <section style={{ background: "var(--blue)", padding: sp }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {/* 90% — tipográfico, sem caixa */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: "clamp(24px, 5vw, 60px)", marginBottom: 56, flexWrap: "wrap" }}>
            <p style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(96px, 18vw, 160px)",
              fontWeight: 900, lineHeight: 0.9, color: "var(--gold)", flexShrink: 0,
            }}>90%</p>
            <div style={{ paddingBottom: 10, maxWidth: 400 }}>
              <p style={{ fontFamily: "var(--font-playfair)", fontSize: 21, fontWeight: 700, color: "#fff", lineHeight: 1.35, marginBottom: 8 }}>
                dos casos de disfunção erétil têm causa identificável.
              </p>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                E causa identificável tem tratamento.
              </p>
            </div>
          </div>

          <div style={{ height: 1, background: "rgba(255,255,255,0.15)", marginBottom: 56 }} />

          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(28px, 4vw, 46px)",
              fontWeight: 800, lineHeight: 1.2, color: "#fff", marginBottom: 36,
            }}>
              Não é fraqueza. Não é falta de desejo.{" "}
              <em style={{ color: "var(--gold)", fontStyle: "italic" }}>E não é &ldquo;da idade&rdquo;.</em>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(210,225,240,0.8)", marginBottom: 16 }}>
              O que acontece é que a maioria dos homens vai tratando o sintoma — o azulzinho
              resolve por uma noite, mas na próxima o problema tá lá. Porque ninguém olhou para a causa.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(210,225,240,0.8)", marginBottom: 16 }}>
              Não é culpa sua não saber disso. Você aprendeu sobre motor de carro, investimento,
              política. Mas sobre o próprio corpo? <strong style={{ color: "#fff" }}>Silêncio total.</strong>
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: "var(--gold)", fontWeight: 600 }}>
              É exatamente isso que esse curso resolve.
            </p>
          </div>
        </div>
      </section>


      {/* ═══ AUTORIDADE / BIO COMPLETA ═════════════════════ */}
      <section style={{
        background: "linear-gradient(170deg, #050e1c 0%, #071828 55%, #04305e 100%)",
        overflow: "hidden",
      }}>
        {/* Hero da bio com foto + intro */}
        <div style={{
          maxWidth: 1080, margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr 1fr",
        }} className="auth-grid">
          {/* Foto */}
          <div style={{ position: "relative", minHeight: 560 }}>
            <Image
              src="/dr-luis-hero.jpg"
              alt="Dr. Luis Henrique Nunes"
              fill
              style={{ objectFit: "cover", objectPosition: "center top" }}
              priority
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to right, transparent 55%, #071828 100%)",
            }} />
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: 120,
              background: "linear-gradient(to bottom, transparent, #071828)",
            }} />
          </div>

          {/* Texto intro */}
          <div style={{
            padding: "80px clamp(32px, 5vw, 72px) 80px clamp(24px, 3vw, 40px)",
            display: "flex", flexDirection: "column", justifyContent: "center",
          }}>
            <Eyebrow text="Quem é o Dr. Luis" light />
            <h2 style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(24px, 3vw, 36px)",
              fontWeight: 800, lineHeight: 1.25, color: "#f0f5fc", marginBottom: 28,
            }}>
              Eu já atendi milhares de homens com esse problema.
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: 15, lineHeight: 1.85, color: "#7a9ab8", marginBottom: 32 }}>
              <p>Muito prazer, eu sou o <strong style={{ color: "#f0f5fc" }}>Dr. Luis Henrique Nunes</strong> (CRM PE 25358 | CRM BA 22602 | RQE 4158).</p>
              <p>Sou médico Urologista, Andrologista e atuo diariamente com o que há de mais avançado em tecnologia cirúrgica — como videolaparoscopia e cirurgia robótica — para garantir a rápida recuperação e a qualidade de vida dos meus pacientes.</p>
              <p style={{
                fontFamily: "var(--font-playfair)", fontStyle: "italic",
                fontSize: 17, color: "var(--gold)", lineHeight: 1.55,
                paddingLeft: 18, borderLeft: "2px solid var(--gold)",
              }}>
                Eu não estou na internet para te vender fórmulas mágicas. Meu compromisso é com a ciência, com o seu corpo e com a sua identidade masculina.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24 }}>
              {["Urologista e Andrologista", "+10 anos em saúde masculina", "Milhares de casos tratados", "CRM PE 25358 | CRM BA 22602", "RQE 4158"].map((b, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, color: "#7a9ab8", fontSize: 13 }}>
                  <span style={{ color: "var(--gold)", flexShrink: 0 }}>{Ico.check}</span>{b}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bio detalhada - currículo */}
        <div style={{ maxWidth: 900, margin: "0 auto", padding: sp }}>
          <div style={{ marginBottom: 56 }}>
            <h3 style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(22px, 3vw, 32px)",
              fontWeight: 800, lineHeight: 1.3, color: "#f0f5fc",
              marginBottom: 16, textAlign: "center",
            }}>
              Uma base sólida e inquestionável de conhecimento
            </h3>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "#7a9ab8", textAlign: "center", maxWidth: 680, margin: "0 auto" }}>
              Ao longo de mais de uma década, construí minha jornada para te entregar exatamente o que funciona. Minha formação começou na <strong style={{ color: "#f0f5fc" }}>Escola Bahiana de Medicina e Saúde Pública (2010)</strong>, e desde então, eu não parei de buscar a excelência.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }} className="two-col">
            {/* Credenciais */}
            {[
              {
                title: "Experiência de Linha de Frente",
                desc: "Concluí minhas residências em Cirurgia Geral (2012-2014) e Urologia (2014-2017) no Hospital Santo Antônio (BA) — uma das maiores, mais complexas e bem equipadas unidades de saúde do Norte e Nordeste do país.",
              },
              {
                title: "A Maior Referência em Saúde Sexual",
                desc: "Especialista em Andrologia, com Fellow em Medicina Sexual e Reprodutiva pela renomada Faculdade de Medicina do ABC, em São Paulo (2018). Atualmente, andrologista titular do Instituto da Mulher (Petrolina), liderando tratamentos complexos de infertilidade e saúde reprodutiva.",
              },
              {
                title: "Pioneirismo em Tecnologia",
                desc: "Formado em Laparoscopia Avançada pelo IRCAD (Barretos-SP), o maior centro de treinamento em cirurgia minimamente invasiva de toda a América Latina.",
              },
              {
                title: "Reconhecimento Científico",
                desc: "Autor de abordagens inovadoras publicadas, como a técnica de duplo retalho V-Y para o Tratamento da Estenose de Uretra Distal.",
              },
              {
                title: "Medicina de Alta Complexidade",
                desc: "Desde 2019, integro a Equipe de Transplante do Estado de Pernambuco e atuo como médico concursado e Staff da residência médica no Hospital Otávio de Freitas (Recife), a maior emergência urológica do estado.",
              },
            ].map((cred, i) => (
              <div key={i} style={{
                padding: 28,
                background: "rgba(255,255,255,0.03)",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.06)",
                gridColumn: i === 4 ? "1 / -1" : undefined,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <span style={{ color: "var(--gold)", flexShrink: 0 }}>{Ico.check}</span>
                  <h4 style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: 16, fontWeight: 700, color: "var(--gold)",
                  }}>{cred.title}</h4>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: "#7a9ab8" }}>{cred.desc}</p>
              </div>
            ))}
          </div>

          {/* Galeria de fotos */}
          <div style={{
            display: "flex", justifyContent: "center",
            marginTop: 56,
          }} className="photo-grid">
            <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", aspectRatio: "3/4", width: "100%", maxWidth: 380 }}>
              <Image src="/dr-luis-4.png" alt="Dr. Luis Henrique" fill style={{ objectFit: "cover" }} />
            </div>
          </div>

          {/* Por que criei o curso */}
          <div style={{
            marginTop: 56, padding: 40,
            background: "rgba(205,161,2,0.06)",
            borderRadius: 12,
            border: "1px solid rgba(205,161,2,0.15)",
          }}>
            <h3 style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(20px, 2.5vw, 28px)",
              fontWeight: 800, lineHeight: 1.3, color: "var(--gold)",
              marginBottom: 20,
            }}>
              Por que eu criei o Curso Potência Masculina?
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: 15, lineHeight: 1.85, color: "#7a9ab8" }}>
              <p>Porque no meu consultório, eu vejo diariamente as consequências de homens que tentaram resolver seus problemas com dicas de internet ou remédios escondidos. <strong style={{ color: "#f0f5fc" }}>Você merece ter acesso à informação médica de altíssimo nível, sem tabus e sem julgamentos.</strong></p>
              <p>Neste curso, você não vai aprender com um &ldquo;curioso&rdquo;. Você vai aprender com um especialista que está no centro cirúrgico e no consultório todos os dias, resolvendo os problemas que a maioria dos homens tem vergonha de falar.</p>
              <p style={{
                fontFamily: "var(--font-playfair)", fontStyle: "italic",
                fontSize: 17, color: "var(--gold)", lineHeight: 1.55,
                paddingLeft: 18, borderLeft: "3px solid var(--gold)",
              }}>
                Se você quer retomar o controle do seu corpo com segurança, eficácia e embasamento científico pesado, eu vou te guiar nesse processo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PARA QUEM ═════════════════════════════════════ */}
      <section style={{ background: "#fff", padding: sp }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <Eyebrow text="Esse curso é pra você?" />
            <h2 style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 800, color: "#0d1c2e",
            }}>
              Antes de comprar, seja honesto.
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }} className="two-col">
            <div>
              <p style={{ fontFamily: "var(--font-playfair)", fontSize: 17, fontWeight: 700, color: "var(--blue)", marginBottom: 24 }}>
                É para você se:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {["Você teve falhas recentes e quer entender o que está acontecendo", "Você usa azulzinho e quer saber se precisa mesmo — ou se tem caminho melhor", "Você chegou nos 40, 50, 60 e quer saber se é definitivo ou reversível", "Você quer chegar num médico preparado, com as perguntas certas", "Você prefere informação confiável de especialista a continuar no Google"].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <span style={{ color: "var(--blue)", flexShrink: 0, marginTop: 1 }}>{Ico.check}</span>
                    <p style={{ fontSize: 15, lineHeight: 1.65, color: "#354f6b" }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ borderLeft: "1px solid #dde5ef", paddingLeft: 48 }}>
              <p style={{ fontFamily: "var(--font-playfair)", fontSize: 17, fontWeight: 700, color: "#9ab0c4", marginBottom: 24 }}>
                Não é para você se:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {["Você está procurando milagre ou fórmula mágica — não tem", "Você quer substituir uma consulta médica — o curso te prepara para ela, não a substitui", "Você já sabe tudo sobre o assunto e só quer validação"].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <span style={{ color: "#9ab0c4", flexShrink: 0, marginTop: 1 }}>{Ico.x}</span>
                    <p style={{ fontSize: 15, lineHeight: 1.65, color: "#9ab0c4" }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══════════════════════════════════════════ */}
      <section id="comprar" style={{
        background: "#fff",
        padding: sp, textAlign: "center",
      }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          {/* Logo Potência Masculina */}
          <div style={{ marginBottom: 32, display: "flex", justifyContent: "center" }}>
            <Image
              src="/logo-potencia.png"
              alt="Potência Masculina"
              width={200}
              height={200}
              style={{ objectFit: "contain" }}
            />
          </div>

          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--blue)", marginBottom: 20 }}>
            Investimento único
          </p>
          <p style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(64px, 12vw, 108px)",
            fontWeight: 900, lineHeight: 1, color: "#0d1c2e", marginBottom: 6,
          }}>R$&nbsp;197</p>
          <p style={{ fontSize: 14, color: "#5a6e82", marginBottom: 48 }}>
            Acesso imediato · Vitalício
          </p>

          <CTA />

          <div style={{ marginTop: 48, paddingTop: 40, borderTop: "1px solid #dde5ef" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12, color: "var(--blue)" }}>
              {Ico.shield}
              <span style={{ fontFamily: "var(--font-playfair)", fontSize: 16, fontWeight: 700, color: "var(--blue)" }}>
                Garantia de 7 dias
              </span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: "#5a6e82", maxWidth: 380, margin: "0 auto" }}>
              Se você assistir e achar que não valeu, é só pedir o reembolso.
              Sem formulário, sem explicação, sem julgamento.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══════════════════════════════════════════ */}
      <section style={{ background: "#f5f7fa", padding: sp }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <Eyebrow text="FAQ" />
            <h2 style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(26px, 3.5vw, 38px)",
              fontWeight: 800, lineHeight: 1.25, color: "#0d1c2e",
            }}>
              Perguntas que você provavelmente tem
            </h2>
          </div>

          <div style={{ borderTop: "1px solid #dde5ef" }}>
            {FAQS.map((f, i) => <FAQ key={i} q={f.q} a={f.a} />)}
          </div>

          <div style={{ marginTop: 52 }}>
            <CTA />
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ════════════════════════════════════════ */}
      <footer style={{
        background: "#06101e", padding: "28px clamp(24px, 6vw, 100px)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 12,
      }}>
        <p style={{ fontSize: 12, color: "#2a3e54" }}>
          © {new Date().getFullYear()} Dr. Luis Henrique · Urologista &amp; Andrologista
        </p>
        <p style={{ fontSize: 12, color: "#2a3e54" }}>
          Este produto não substitui consulta médica especializada.
        </p>
      </footer>

      <style>{`
        @media (max-width: 860px) {
          .hero-section { 
            flex-direction: column !important; 
            min-height: auto !important;
          }
          .hero-photo { 
            position: relative !important;
            width: 100% !important; 
            height: 50vh !important;
            top: auto !important; right: auto !important; bottom: auto !important;
            opacity: 1 !important;
            -webkit-mask-image: linear-gradient(to bottom, black 40%, black 60%, transparent 100%) !important;
            mask-image: linear-gradient(to bottom, black 40%, black 60%, transparent 100%) !important;
          }
          .hero-content { 
            width: 100% !important; 
            max-width: 100% !important;
            text-align: center !important;
            padding: 0 clamp(24px, 6vw, 60px) 80px !important;
            margin-left: 0 !important;
            margin-top: -60px;
          }
          .hero-content p:first-child { justify-content: center !important; }
          .hero-content > div:last-child { margin: 0 auto; }
          .auth-grid  { grid-template-columns: 1fr !important; }
          .auth-grid > div:first-child { min-height: 360px !important; }
          .auth-grid > div:first-child > div:last-child {
            background: linear-gradient(to bottom, transparent 40%, #071828 100%) !important;
          }
          .two-col    { grid-template-columns: 1fr !important; gap: 40px !important; }
          .two-col > div:last-child { border-left: none !important; padding-left: 0 !important; border-top: 1px solid #dde5ef; padding-top: 40px; }
          .modules-grid { grid-template-columns: 1fr 1fr !important; }
          .modules-grid > div { border-right: none !important; }
        }
        @media (max-width: 540px) {
          .modules-grid { grid-template-columns: 1fr !important; }
          .hero-photo { height: 40vh !important; }
        }
        @keyframes pdot {
          0%,100% { opacity:1; } 50% { opacity:.35; }
        }
      `}</style>
    </main>
  );
}
