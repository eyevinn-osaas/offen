var html = require('choo/html')
var raw = require('choo/html/raw')

var Input = require('./../components/input')

module.exports = view

function view (state, emit) {
  var availableAccounts = state.authenticatedUser.accounts
    .slice()
    .sort(function (a, b) {
      return a.accountName.localeCompare(b.accountName)
    })
    .map(function (account) {
      return html`
        <li>
          <a href="/auditorium/${account.accountId}/" class="f5 link dim bn ph3 pv2 mr2 mb1 dib br1 white bg-mid-gray">${account.accountName}</a>
        </li>
      `
    })
  var accountHeader = html`
    <p class="dib pa2 br2 ma0 mt3 ml3 ml0-ns mr3 mr0-ns bg-light-yellow">${raw(__('You are logged in as <strong>operator.</strong>'))}</p>
  `

  var loggedInMessage = html`
    <div class="w-100 pa3 mt4 mb2 br0 br2-ns bg-black-05">
      <h4 class ="f5 normal mt0 mb3">${__('Choose account')}</h4>
      <ul class="flex flex-wrap list pl0 mt0 mb3">
        ${availableAccounts}
      </ul>
  `

  function handleChangeEmail (e) {
    e.preventDefault()
    var formData = new window.FormData(e.currentTarget)
    emit(
      'offen:change-credentials',
      {
        password: formData.get('password'),
        emailAddress: formData.get('email-address')
      },
      __('Please log in again, using your updated email.'),
      __('Could not change email. Try again.')
    )
  }

  var changeEmailForm = html`
    <div class="w-100 pa3 mb2 br0 br2-ns bg-black-05">
      <h4 class="f5 normal mt0 mb3">Change email address</h4>
      <form class="mw6 center" onsubmit="${handleChangeEmail}">
        <label class="b lh-copy">
          ${__('New email address')}
          ${state.cache(Input, 'console/change-email-email', { name: 'email-address' }).render()}
        </label>
        <label class="b lh-copy">
          ${__('Password')}
          ${state.cache(Input, 'console/change-email-password', { name: 'password', type: 'password' }).render()}
        </label>
        <input class="pointer w-100 w-auto-ns f5 link dim bn ph3 pv2 mb3 dib br1 white bg-mid-gray" type="submit" value="${__('Change Email address')}">
      </form>
    </div>
  `

  function handleChangePassword (e) {
    e.preventDefault()
    var formData = new window.FormData(e.currentTarget)
    if (formData.get('changed') !== formData.get('repeat')) {
      state.flash = __('Passwords did not match. Please try again.')
      return emit(state.events.RENDER)
    }
    emit(
      'offen:change-credentials',
      {
        currentPassword: formData.get('current'),
        changedPassword: formData.get('changed')
      },
      __('Please log in again, using your new password.'),
      __('Could not change passwords. Try again.')
    )
  }

  var changePasswordForm = html`
    <div class="w-100 pa3 mb2 br0 br2-ns bg-black-05">
      <h4 class="f5 normal mt0 mb3">Change password</h4>
      <form class="mw6 center" onsubmit="${handleChangePassword}">
        <label class="b lh-copy">
          ${__('Current password')}
          ${state.cache(Input, 'console/change-password-current', { type: 'password', name: 'current' }).render()}
        </label>
        <label class="b lh-copy">
          ${__('New password')}
          ${state.cache(Input, 'console/change-password-changed', { type: 'password', name: 'changed' }).render()}
        </label>
        <label class="b lh-copy">
          ${__('Repeat new password')}
          ${state.cache(Input, 'console/change-password-repeat', { type: 'password', name: 'repeat' }).render()}
        </label>
        <input class="pointer w-100 w-auto-ns f5 link dim bn ph3 pv2 mb3 dib br1 white bg-mid-gray" type="submit" value="${__('Change password')}">
      </form>
    </div>
  `

  return html`
    ${accountHeader}
    ${loggedInMessage}
    ${changeEmailForm}
    ${changePasswordForm}
  `
}