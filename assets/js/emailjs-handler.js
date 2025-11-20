document.addEventListener('DOMContentLoaded', function() {
  "use strict";

  emailjs.init("bXkpw8mtqYnW5e8H1");

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function(form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      console.log('Formulario enviado');

      let thisForm = this;

      let loading = thisForm.querySelector('.loading');
      let errorMessage = thisForm.querySelector('.error-message');
      let sentMessage = thisForm.querySelector('.sent-message');

      if (loading) loading.classList.add('d-block');
      if (errorMessage) errorMessage.classList.remove('d-block');
      if (sentMessage) sentMessage.classList.remove('d-block');

      let formData = {
        user_name: thisForm.querySelector('[name="user_name"]').value,
        user_email: thisForm.querySelector('[name="user_email"]').value,
        user_phone: thisForm.querySelector('[name="user_phone"]').value,
        subject: thisForm.querySelector('[name="subject"]').value,
        message: thisForm.querySelector('[name="message"]').value
      };

      console.log('Datos a enviar:', formData);

      emailjs.send('service_nvz1u6e', 'template_kf95au9', formData)
        .then(function(response) {
          console.log('ÉXITO!', response);
          if (loading) loading.classList.remove('d-block');
          if (sentMessage) sentMessage.classList.add('d-block');
          thisForm.reset();
        }, function(error) {
          console.log('ERROR:', error);
          if (loading) loading.classList.remove('d-block');
          if (errorMessage) {
            errorMessage.innerHTML = 'Error al enviar el mensaje. Por favor, inténtelo de nuevo. Código: ' + error.status;
            errorMessage.classList.add('d-block');
          }
        });
    });
  });
});