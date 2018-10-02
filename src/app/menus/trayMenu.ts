import {trayWindow} from '../windows';

export const trayMenuTemplate = [
  {
    label: 'Item1',
    type: 'radio'
  },
  {
    label: 'Item2',
    type: 'radio'
  },
  {
    label: 'Item3',
    type: 'radio'
  },
  {
    label: 'Item4',
    type: 'radio'
  }
];

export const trayClickListener = (event, bounds) => {
  console.log(bounds.x);
  console.log(bounds.y);

  // Calculate window position depending on OS
  const { x, y } = bounds;
  const {height, width} = trayWindow.getBounds();
  let windowX: number = 0;
  let windowY: number = 0;

  if (process.platform === 'darwin') {
    windowX = x - width / 2;
    windowY = y;
  } else {
    windowX = x;
    windowY = y - height;
  };

  // Toggle visibility on left-click
  if (trayWindow) {
    if (trayWindow.isVisible()) {
      trayWindow.hide();
    } else {
      trayWindow.setBounds({
        x: windowX,
        y: windowY,
        height: height,
        width: width
      });
      trayWindow.show();
    }
  } else {
    console.error('TrayWindow does not exist.');
  }
};
