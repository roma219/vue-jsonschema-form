import Vue, { DirectiveOptions } from 'vue'

function checkKeyDown (el: HTMLElement, binding: any) {
  el.addEventListener('keydown', (e: KeyboardEvent) => {
    // delete, backpsace, tab, escape, enter,
    let special = [46, 8, 9, 27, 13]

    if (binding.modifiers['decimal']) {
      // decimal(numpad), period
      special.push(110, 190)
    }

    // special from above
    if (
      special.indexOf(e.keyCode) !== -1 ||
      // Ctrl+A
      (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
      // Ctrl+C
      (e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true)) ||
      // Ctrl+V
      (e.keyCode === 86 && (e.ctrlKey === true || e.metaKey === true)) ||
      // Ctrl+X
      (e.keyCode === 88 && (e.ctrlKey === true || e.metaKey === true)) ||
      // home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)
    ) {
      return // allow
    }

    // escape `-` as first symbol
    if (
      binding.value.negativeNumber === true &&
      ((e.target as any).selectionStart === 0 && e.keyCode === 189)) {
      return
    }

    // escape `float number`
    if (!(e.target as any).value.includes('.') && binding.value.isFloat === true && e.keyCode === 190) {
      return
    }

    if (
      binding.modifiers['number'] &&
      // number keys without shift
      ((!e.shiftKey && (e.keyCode >= 48 && e.keyCode <= 57)) ||
        // numpad number keys
        (e.keyCode >= 96 && e.keyCode <= 105))
    ) {
      return // allow
    }

    // otherwise stop the keystroke
    e.preventDefault()
  })
}

export default {
  bind (el: HTMLElement, binding: any) {
    if (binding.value.isNumber) {
      checkKeyDown(el, binding)
    }
  }
}
