import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const ContactForm = ({ titulo, imagen, redes, contactos, translations }) => {
	const [formData, setFormData] = useState({
		nombre: "",
		email: "",
		ocupacion: "",
		telefono: "",
		servicios: "",
		mensaje: "",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [message, setMessage] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const response = await fetch("/api/send-email", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const result = await response.json();
			if (response.ok) {
				setMessage("Mensaje enviado con éxito");
				setFormData({
					nombre: "",
					email: "",
					ocupacion: "",
					telefono: "",
					servicios: "",
					mensaje: "",
				});
			} else {
				setMessage("Error al enviar el mensaje");
			}
		} catch (error) {
			console.error("Error:", error);
			setMessage("Error al enviar el mensaje");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section className="sectionForm py-4 py-lg-5">
			<div className="container px-1">
				<div className="row">
					<div className="col-lg-6 m-auto text-center pb-3">
						<h2 className="fs-3">{translations.sectionFormTitulo || titulo}</h2>
					</div>
				</div>
				<div className="row flex-column-reverse flex-lg-row">
					<div className="col-lg-7 mb-3 mb-lg-0 pe-lg-10">
						<form onSubmit={handleSubmit}>
							<div className="row">
								<div className="col-lg-12 mb-1">
									<label htmlFor="nombre" className="form-label sr-only">
										{translations?.fullName || 'Full Name'}
									</label>
									<input
										type="text"
										className="form-control py-1 border-top-0 border-start-0 border-end-0 border-bottom-1 rounded-0 font-secondary text-uppercase fs-small px-0"
										id="nombre"
										name="nombre"
										placeholder={translations?.fullName || 'Full Name'}
										value={formData.nombre}
										onChange={handleChange}
										required
									/>
								</div>
								<div className="col-lg-12 mb-1">
									<label htmlFor="email" className="form-label sr-only">
										{translations?.email || 'Email'}
									</label>
									<input
										type="email"
										className="form-control py-1 border-top-0 border-start-0 border-end-0 border-bottom-1 rounded-0 font-secondary text-uppercase fs-small px-0"
										id="email"
										name="email"
										placeholder={translations?.email || 'E-mail'}
										value={formData.email}
										onChange={handleChange}
										required
									/>
								</div>
								<div className="col-lg-6 mb-1">
									<label htmlFor="ocupacion" className="form-label sr-only">
										{translations?.occupation || 'Occupation'}
									</label>
									<input
										type="text"
										className="form-control py-1 border-top-0 border-start-0 border-end-0 border-bottom-1 rounded-0 font-secondary text-uppercase fs-small px-0"
										id="ocupacion"
										name="ocupacion"
										placeholder={translations?.occupation || 'Occupation'}
										value={formData.ocupacion}
										onChange={handleChange}
									/>
								</div>
								<div className="col-lg-6 mb-1">
									<label htmlFor="telefono" className="form-label sr-only">
										{translations?.phone || 'Phone'}
									</label>
									<input
										type="tel"
										className="form-control py-1 border-top-0 border-start-0 border-end-0 border-bottom-1 rounded-0 font-secondary text-uppercase fs-small px-0"
										id="telefono"
										name="telefono"
										placeholder={translations?.phone || 'Phone'}
										value={formData.telefono}
										onChange={handleChange}
									/>
								</div>
								<div className="col-lg-12 mb-1">
									<label htmlFor="servicios" className="form-label sr-only">
										{translations?.services || 'Services'}
									</label>
									<input
										type="text"
										className="form-control py-1 border-top-0 border-start-0 border-end-0 border-bottom-1 rounded-0 font-secondary text-uppercase fs-small px-0"
										id="servicios"
										name="servicios"
										placeholder={translations?.services || 'Services'}
										value={formData.servicios}
										onChange={handleChange}
									/>
								</div>
								<div className="col-lg-12">
									<label htmlFor="mensaje" className="form-label sr-only">
										{translations?.message || 'Message'}
									</label>
									<textarea
										className="form-control py-1 border-top-0 border-start-0 border-end-0 border-bottom-1 rounded-0 font-secondary text-uppercase fs-small px-0"
										id="mensaje"
										name="mensaje"
										placeholder={translations?.message || 'Message'}
										value={formData.mensaje}
										onChange={handleChange}
										required
									/>
								</div>
							</div>
							<div className="mt-1 text-center">
								<button
									type="submit"
									className="btn btn-primary rounded-0 py-1 px-3 font-secondary text-uppercase"
									disabled={isSubmitting}
								>
									{isSubmitting ? (translations?.sending || 'Sending...') : (translations?.contact || 'Contact')}
								</button>
								{message && <p className="mt-3">{message}</p>}
							</div>
						</form>
					</div>
					<div className="col-lg-5">
						{/* <div className="col-12 bg-gray-200 px-1 py-2 p-xl-3 rounded-5 shadow">
							{contactos?.map((contacto, index) => (
								<Link href={contacto?.cta?.url} key={index}>
									<a className="d-flex w-f align-items-center mb-2">
										<span className="d-flex bg-white p-1 rounded-5">
											<Image
												src={contacto?.icono?.mediaItemUrl}
												alt={contacto?.cta?.title}
												width={24}
												height={24}
											/>
										</span>
										<p className="ms-1">{contacto.cta.title}</p>
									</a>
								</Link>
							))}
							<div className="d-flex justify-content-center gap-1">
								{redes?.map((red, index) => (
									<Link href={red?.cta?.url} key={index}>
										<a className="">
											<Image
												src={red?.icono?.mediaItemUrl}
												alt={red?.cta?.title}
												width={24}
												height={24}
											/>
											<p className="sr-only">{red?.cta?.title}</p>
										</a>
									</Link>
								))}
							</div>
						</div> */}
						<div className="d-flex justify-content-center mb-lg-0 mb-1">
							<Image
								src={imagen?.mediaItemUrl}
								alt={imagen?.altText}
								width={432}
								height={432}
								className="object-fit-cover"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ContactForm;
