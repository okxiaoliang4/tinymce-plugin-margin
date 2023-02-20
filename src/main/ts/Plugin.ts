import { Editor, TinyMCE } from 'tinymce';

declare const tinymce: TinyMCE;

const setup = (editor: Editor, url: string): void => {
  editor.ui.registry.addButton('margin', {
    text: 'margin button',
    onAction: () => {
      editor.setContent('<p>content added from margin</p>');
    }
  });
};

export default (): void => {
  tinymce.PluginManager.add('margin', setup);
};
