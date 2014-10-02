var signupDialogHelperInst = window.optly.mrkt.form.createAccount({formId: 'signup-form', dialogId: 'signup-dialog'});

var signupForm = new Oform({
  selector: '#signup-form',
  customValidation: {
    password1: function(elm) {
      return signupDialogHelperInst.password1Validate(elm);
    },
    password2: function(elm) {
      return signupDialogHelperInst.password2Validate(elm);
    }
  }
});

signupForm.on('before', function() {
  //set the hidden input value
  signupDialogHelperInst.formElm.querySelector('[name="hidden"]').value = 'touched';
  signupDialogHelperInst.processingAdd();
  if(signupDialogHelperInst.characterMessageElm.classList.contains('oform-error-show')) {
    signupDialogHelperInst.characterMessageElm.classList.remove('oform-error-show');
  }
  return true;
});

signupForm.on('validationerror', function(elm) {
  w.optly.mrkt.Oform.validationError(elm);
  signupDialogHelperInst.showOptionsError('Please Correct Form Errors');
  if(!signupDialogHelperInst.characterMessageElm.classList.contains('oform-error-show')) {
    signupDialogHelperInst.characterMessageElm.classList.add('oform-error-show');
  }
});

signupForm.on('load', function(e){
  signupDialogHelperInst.load(e);
  signupDialogHelperInst.processingRemove({callee: 'load'});
});

signupForm.on('done', function() {
  window.setTimeout(function() {
    signupDialogHelperInst.scrollTopDialog();
  }, 500);

  signupDialogHelperInst.processingRemove({callee: 'done'});
}.bind(signupDialogHelperInst));


