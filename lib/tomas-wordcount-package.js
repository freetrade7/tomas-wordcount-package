'use babel';

import TomasWordcountPackageView from './tomas-wordcount-package-view';
import { CompositeDisposable } from 'atom';

export default {

  tomasWordcountPackageView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.tomasWordcountPackageView = new TomasWordcountPackageView(state.tomasWordcountPackageViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.tomasWordcountPackageView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'tomas-wordcount-package:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.tomasWordcountPackageView.destroy();
  },

  serialize() {
    return {
      tomasWordcountPackageViewState: this.tomasWordcountPackageView.serialize()
    };
  },

  toggle() {
    console.log('TomasWordcountPackage was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
