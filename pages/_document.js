import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="es">
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
					
				<link
					href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300..700;1,300..700&display=swap"
					rel="stylesheet"
				/>

				<link
					href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
					rel="stylesheet"
				/>

				<link rel="icon" href="/favicon.ico" />
				<link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
				<link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
				<link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
				<link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
				<link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
				<link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
				<link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
				<link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
				<link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="manifest" href="/manifest.json" />
				<meta name="msapplication-TileColor" content="#ffffff" />
				<meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
				<meta name="theme-color" content="#ffffff" />

				<meta name="google-site-verification" content="RYwO9ks7Tv62I-dHVy0M-dbnf9cfKUiSw0JWX9bQkgA" />

				<script
					dangerouslySetInnerHTML={{
						__html: `(
							function(w,d,s,l,i){
								w[l]=w[l]||[];
								w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
								var f=d.getElementsByTagName(s)[0],
								j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
								j.async=true;
								j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
								f.parentNode.insertBefore(j,f);
							}
						)(window,document,'script','dataLayer','GTM-MCXPHG3W');`,
					}}
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
				<noscript
					dangerouslySetInnerHTML={{
						__html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MCXPHG3W" height="0" width="0" style="display: none; visibility: hidden;" />`,
					}}
				/>
			</body>
		</Html>
	);
}
