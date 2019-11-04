var html = require('choo/html')

module.exports = view

function view (state, emit) {
  function handleSubmit (e) {
    e.preventDefault()
    var formData = new window.FormData(e.currentTarget)
    if (formData.get('password') !== formData.get('repeat-password')) {
      return emit('offen:flash', __('Passwords did not match. Please try again.'))
    }
    emit('offen:reset-password', {
      emailAddress: formData.get('email-address'),
      password: formData.get('password'),
      token: formData.get('token')
    })
  }
  var form = html`
    <form onsubmit=${handleSubmit}>
      <div class="row">
        <div class="eight columns">
          <label>
            ${__('Email address:')}
          </label>
          <input class="u-full-width" required type="email" name="email-address" placeholder="${__('Your email address')}">
        </div>
      </div>
      <div class="row">
        <div class="eight columns">
          <label>
            ${__('New password:')}
          </label>
          <input class="u-full-width" required type="password" name="password" placeholder="${__('Your new password')}">
        </div>
      </div>
      <div class="row">
        <div class="eight columns">
          <label>
            ${__('Repeat password:')}
          </label>
          <input class="u-full-width" required type="password" name="repeat-password" placeholder="${__('Repeat password')}">
        </div>
      </div>
      <div class="row">
        <div class="eight columns">
          <input class="u-full-width" type="submit" value="${__('Reset password')}">
        </div>
      </div>
      <input type="hidden" name="token" value=${state.params.token}>
    </form>
  `

  return form
}
