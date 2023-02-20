import { Editor, TinyMCE } from 'tinymce';

declare const tinymce: TinyMCE;

const setup = (editor: Editor): void => {
  const marignTopVal: string = editor.getParam('margin_top', '0px 8px 16px 32px 40px')
  const marginBottomVal: string = editor.getParam('margin_bottom', '0px 8px 16px 32px 40px')
  editor.on('init', () => {
    editor.formatter.register({
      'margin-top': {
        block: 'p',
        styles: {
          'margin-top': '%value'
        }
      },
      'margin-bottom': {
        block: 'p',
        styles: {
          'margin-bottom': '%value'
        }
      }
    })
  });

  editor.ui.registry.addMenuButton('margin', {
    text: '段间距',
    fetch(callback) {
      callback([
        {
          type: 'nestedmenuitem',
          text: '上边距',
          getSubmenuItems: () => {
            return marignTopVal.split(' ').map((item) => {
              return {
                type: 'togglemenuitem',
                text: item,
                active: editor.formatter.match('margin-top', { value: item }),
                onAction: () => {
                  editor.formatter.toggle('margin-top', { value: item })
                }
              }
            })
          }
        },
        {
          type: 'nestedmenuitem',
          text: '下边距',
          getSubmenuItems: () => {
            return marginBottomVal.split(' ').map((item) => {
              return {
                type: 'togglemenuitem',
                text: item,
                active: editor.formatter.match('margin-bottom', { value: item }),
                onAction: () => {
                  editor.formatter.toggle('margin-bottom', { value: item })
                }
              }
            })
          }
        }
      ])
    }
  });
};

export default (): void => {
  tinymce.PluginManager.add('margin', setup);
};
