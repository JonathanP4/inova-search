export function Footer() {
	return (
		<footer className="text-muted-foreground text-sm p-12 mt-24">
			<div className="flex items-center justify-evenly">
				<div className="flex items-center gap-1">
					<img src="icon.png" alt="" width={50} height={50} />
					<img src="name.png" alt="" width={100} />
				</div>
				<ul className="flex items-center justify-between gap-8">
					<li>
						<a href="#como_funciona">Como funciona</a>
					</li>
					{/* <li>
						<a href="#">Ideias</a>
					</li> */}
					<li>
						<a href="#vantagens">Vantagens</a>
					</li>
				</ul>
			</div>
			<div className="w-full h-px bg-border my-4"></div>
			<div className="flex items-center justify-around">
				<p>2026 Inova-Search. Desenvolvido por Jonathan Petersen</p>
				<p>"Grandes ideias movem grandes negócios"</p>
			</div>
		</footer>
	);
}
