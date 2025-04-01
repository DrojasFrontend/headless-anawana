import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const ContactForm = ({ titulo, redes, contactos, translations }) => {
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
			<div className="container-fluit px-1">
				<div className="row">
					<div className="col-lg-6 m-auto text-center pb-3">
						<h2 className="fs-3">{translations.sectionFormTitulo || titulo}</h2>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-8 mb-3 mb-lg-0">
						<form onSubmit={handleSubmit}>
							<div className="row">
								<div className="col-lg-6 mb-1">
									<label htmlFor="nombre" className="form-label sr-only">
										Nombre
									</label>
									<input
										type="text"
										className="form-control py-1"
										id="nombre"
										name="nombre"
										placeholder="Nombre"
										value={formData.nombre}
										onChange={handleChange}
										required
									/>
								</div>
								<div className="col-lg-6 mb-1">
									<label htmlFor="email" className="form-label sr-only">
										Email
									</label>
									<input
										type="email"
										className="form-control py-1"
										id="email"
										name="email"
										placeholder="Email"
										value={formData.email}
										onChange={handleChange}
										required
									/>
								</div>
								<div className="col-lg-6 mb-1">
									<label htmlFor="ocupacion" className="form-label sr-only">
										Ocupación
									</label>
									<input
										type="text"
										className="form-control py-1"
										id="ocupacion"
										name="ocupacion"
										placeholder="Ocupacion"
										value={formData.ocupacion}
										onChange={handleChange}
									/>
								</div>
								<div className="col-lg-6 mb-1">
									<label htmlFor="telefono" className="form-label sr-only">
										Teléfono
									</label>
									<input
										type="tel"
										className="form-control py-1"
										id="telefono"
										name="telefono"
										placeholder="Telefono"
										value={formData.telefono}
										onChange={handleChange}
									/>
								</div>
								<div className="col-lg-12 mb-1">
									<label htmlFor="servicios" className="form-label sr-only">
										Servicios
									</label>
									<input
										type="text"
										className="form-control py-1"
										id="servicios"
										name="servicios"
										placeholder="Servicios"
										value={formData.servicios}
										onChange={handleChange}
									/>
								</div>
								<div className="col-lg-12">
									<label htmlFor="mensaje" className="form-label sr-only">
										Escribir mensaje.....
									</label>
									<textarea
										className="form-control py-1"
										id="mensaje"
										name="mensaje"
										placeholder="Escribir mensaje....."
										value={formData.mensaje}
										onChange={handleChange}
										required
									/>
								</div>
							</div>
							<div className="mt-1">
								<button
									type="submit"
									className="btn btn-primary"
									disabled={isSubmitting}
								>
									{isSubmitting ? "Enviando..." : "Enviar"}
								</button>
								{message && <p className="mt-3">{message}</p>}
							</div>
						</form>
					</div>
					<div className="col-lg-4">
						<div className="col-12 bg-gray-200 px-1 py-2 p-xl-3 rounded-5 shadow">
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
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ContactForm;
