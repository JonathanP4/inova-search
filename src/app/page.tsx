"use client";

import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/store/AuthProvider";
import {
	ArrowRight,
	Lightbulb,
	Users,
	Heart,
	TrendingUp,
	BrainCircuit,
	Store,
	Settings,
	Clock,
	Send,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
	const user = useAuth();

	return (
		<>
			<main className="p-6">
				<section className="md:min-h-[calc(100svh-76px)] flex w-full items-center justify-evenly text-neutral-800">
					<div className="max-w-lg space-y-6">
						<p className="text-xs uppercase tracking-widest">
							Ideias de automação para um futuro mais eficiente
						</p>
						<h1 className="text-3xl md:text-6xl font-bold">
							Sua empresa tem <br />
							<span className="text-primary">um gargalo?</span>
							<br />
							Aqui sua ideia
							<br />
							<span className="text-primary">vira solução</span>
						</h1>
						<p className="text-sm md:text-base">
							Cadastre ideias de automações que podem otimizar seus processos,
							reduzir custos e aumentar a produtividade da sua empresa.
						</p>
						<a href={`${!!user ? "/cadastro" : "/auth"}`}>
							<Button
								className={"p-5 rounded-full cursor-pointer text-popover"}
							>
								{!!user ? "Cadastrar ideia agora" : "Começe a usar agora"}
								<ArrowRight />
							</Button>
						</a>
					</div>
					<div className="absolute -z-10 opacity-20 md:relative md:opacity-100">
						<img src="hero-image.png" alt="" />
					</div>
				</section>

				<section
					id="como_funciona"
					className="p-12 bg-primary/5 rounded-t-4xl text-neutral-800  flex flex-col justify-center space-y-12 mt-12 md:h-dvh  md:m-0"
				>
					<div>
						<h1 className="text-3xl font-semibold mb-2">Como funciona?</h1>
						<p className="tracking-wide max-w-md">
							O inova-search conecta pequenas e médias empresas a ideias que
							podem tornar seus processos mais eficientes.
						</p>
					</div>
					<div className="flex flex-col md:flex-row items-start justify-between gap-6 mt-12 h-max text-center md:text-left">
						<div className="p-4 rounded-md max-w-xs">
							<div className="p-3 bg-primary/10 rounded-2xl w-fit m-auto md:m-0">
								<Lightbulb size={80} className="text-primary" />
							</div>
							<h2 className="text-lg font-semibold my-4">
								Compartilhe sua ideia
							</h2>
							<p className="text-neutral-600">
								Descreva o processo que deseja automatizar, o problema que
								enfrenta e o impacto que espera alcançar
							</p>
						</div>
						<div className="m-auto">
							<ArrowRight
								className="text-primary rotate-90 md:rotate-0"
								size={40}
							/>
						</div>
						<div className="p-4 rounded-md max-w-xs">
							<div className="p-3 bg-primary/10 rounded-2xl w-fit m-auto md:m-0">
								<Heart size={80} className="text-primary" />
							</div>
							<h2 className="text-lg font-semibold my-4">Receba feedback</h2>
							<p className="text-neutral-600">
								Veja o que outros pensam da sua ideia e tenha uma ideia do
								potencial que ela tem!
							</p>
						</div>
						<div className="m-auto">
							<ArrowRight
								className="text-primary rotate-90 md:rotate-0"
								size={40}
							/>
						</div>
						<div className="p-4 rounded-md max-w-xs">
							<div className="p-3 bg-primary/10 rounded-2xl w-fit m-auto md:m-0">
								<Users size={80} className="text-primary" />
							</div>
							<h2 className="text-lg font-semibold my-4">
								Conecte com pessoas
							</h2>
							<p className="text-neutral-600">
								Encontre pessoas que possam ajudar a transformar sua ideia em
								realidade
							</p>
						</div>
						<div className="m-auto">
							<ArrowRight
								className="text-primary rotate-90 md:rotate-0"
								size={40}
							/>
						</div>
						<div className="p-4 rounded-md max-w-xs">
							<div className="p-3 bg-primary/10 rounded-2xl w-fit m-auto md:m-0">
								<TrendingUp size={80} className="text-primary" />
							</div>
							<h2 className="text-lg font-semibold my-4">
								Sua empresa mais eficiente
							</h2>
							<p className="text-neutral-600">
								Com a solução implementada você ganha tempo, melhora seu serviço
								e aumenta a satisfação de seus clientes
							</p>
						</div>
					</div>

					<div className="space-y-6 mt-12 gap-6 items-center bg-primary/10 p-6 rounded-lg md:px-12 md:rounded-full md:space-y-0 md:grid md:grid-cols-[50px_1fr_2fr_1fr]">
						<BrainCircuit
							size={60}
							className="text-primary m-auto mb-6 md:m-0 md:mb-0"
						/>

						<h2 className="text-2xl col-start-2 font-bold ml-6 text-slate-700">
							Tem alguma ideia inovadora em mente?
						</h2>

						<p className="text-center text-neutral-600">
							Ela pode ser o próximo passo para sua empresa
						</p>

						<Link href={`${!!user ? "/cadastro" : "/auth"}`}>
							<Button
								className={"p-5 rounded-full cursor-pointer text-popover"}
							>
								{!!user ? "Cadastrar ideia agora" : "Começe a usar agora"}
								<ArrowRight />
							</Button>
						</Link>
					</div>
				</section>

				<section
					id="vantagens"
					className="p-12 rounded-t-4xl text-neutral-800 flex flex-col justify-center min-h-dvh"
				>
					<div className="flex flex-col items-center justify-evenly h-full md:flex-row">
						<div className="max-w-md">
							<p className="uppercase text-sm tracking-widest mb-6">
								Vantagens
							</p>
							<h2 className="text-5xl font-bold">
								Porque usar o{" "}
								<span className="text-primary">inova-search?</span>
							</h2>
							<p className="my-4">
								Mais do que uma plataforma, somos um elo entre sua necessidade e
								as melhores soluções de automação.
							</p>
							<img src="target.png" width={330} alt="target" />
						</div>
						<div className="grid md:grid-cols-2 gap-8 mt-12 md:mt-0">
							<div className="border border-border rounded-md p-4 max-w-sm">
								<div className="rounded-xl bg-primary/10 p-2 w-fit text-primary mb-4">
									<Store size={50} />
								</div>
								<h2 className="font-semibold">Foco em PME's</h2>
								<p className="my-2">
									Feito para as necessidades reais de pequenas e médias
									empresas.
								</p>
							</div>
							<div className="border border-border rounded-md p-4 max-w-sm">
								<div className="rounded-xl bg-primary/10 p-2 w-fit text-primary mb-4">
									<Users size={50} />
								</div>
								<h2 className="font-semibold">Conexão com profissionais</h2>
								<p>
									Acesso a profissionais e empresas com experiência em automação
									e tecnologia.
								</p>
							</div>
							<div className="border border-border rounded-md p-4 max-w-sm">
								<div className="rounded-xl bg-primary/10 p-2 w-fit text-primary mb-4">
									<Settings size={50} />
								</div>
								<h2 className="font-semibold">Processo simples</h2>
								<p>Cadastre sua ideia de forma rápida e sem burocracia.</p>
							</div>
							<div className="border border-border rounded-md p-4 max-w-sm">
								<div className="rounded-xl bg-primary/10 p-2 w-fit text-primary mb-4">
									<Clock size={50} />
								</div>
								<h2 className="font-semibold">Mais produtividade</h2>
								<p>
									Menos retrabalho, menos custos e mais tempo para o que
									importa.
								</p>
							</div>
						</div>
					</div>
				</section>
				<section className="md:px-12">
					<div className="bg-teal-900 p-6 py-12 rounded-3xl flex flex-col md:flex-row space-y-6 md:space-y-0 items-center justify-evenly">
						<div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
							<Send className="text-primary" size={40} />
							<div>
								<h2 className="text-2xl text-background font-bold">
									Tem um gargalo que precisa de automação?
								</h2>
								<p className="text-muted">
									Cadastre sua ideia e faça parte dessa transformação.
								</p>
							</div>
						</div>
						<a href={`${!!user ? "/cadastro" : "/auth"}`}>
							<Button
								className={"p-5 rounded-full cursor-pointer text-popover"}
							>
								{!!user ? "Cadastrar ideia agora" : "Começe a usar agora"}
								<ArrowRight />
							</Button>
						</a>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
