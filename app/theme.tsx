'use client';

import { ThemeProvider, createTheme } from 'flowbite-react';

const customTheme = createTheme({
  navbar: {
    root: {
      base: 'bg-transparent border-0 dark:bg-transparent  py-0 rounded-none text-accent dark:hover:text-accent',
      rounded: {
        on: 'rounded-none text-accent hover:text-accent',
        off: 'text-accent hover:text-accent dark:hover:text-accent ',
      },
    },
    brand: {
      base: 'flex items-center space-x-2 text-2xl font-bold text-primarylight',
    },
    toggle: {
      base: 'text-primary dark:text-primary hover:text-accent focus:ring-0 bg-transaprent focus:ring-accent rounded-lg',
    },
    collapse: {
      base: 'mt-8 md:mt-0 flex flex-col md:flex-row md:space-x-6 !border-0',
    },
    link: {
      base: 'pt-2 flex items-center transition-colors duration-200 !border-b-0 !text-highlight hover:!text-primarylight dark:text-primary-50 dark:hover:!text-primarylight focus:!text-primarylight active:!text-primarylight',
      active: {
        on: '!text-primarylight dark:text-primarylight font-normal bg-primarydark lg:bg-transparent dark:lg:bg-transparent',
        off: 'text-primary-50 hover:!text-primarylight dark:text-primary-50 dark:hover:!text-primarylight',
      },
    },
  },

  button: {
    base: 'relative flex border-2 border-accent items-center justify-center rounded-none text-center font-normal focus:outline-none focus:ring-4',
    disabled: 'pointer-events-none opacity-50',
    fullSized: 'w-full',
    grouped: 'rounded-none border-l-0 first:rounded-s-lg first:border-l last:rounded-e-lg focus:ring-2',
    pill: 'rounded-full',
    size: {
      xs: 'h-8 px-3 text-xs',
      sm: 'h-9 px-3 text-sm',
      md: 'h-10 px-5 text-sm',
      lg: 'h-14 px-10 text-base',
      xl: 'h-[52px] px-6 text-base',
    },
    color: {
      default: 'bg-primary rounded-sm  border-primary dark:text-white border-0  text-white hover:bg-primary/90 cursor-pointer dark:bg-primary focus:ring-none hover:scale-100 ' + 'dark:bg-primary dark:hover:bg-primary/90 dark:focus:ring-none',
    },
    outlineColor: {
      default: ' bg-sectiontheme hover:bg-bordertheme  rounded-sm   text-primary  border rounded-0   hover:text-accent focus:ring-primary-300  dark:border-primary dark:text-primary  hover:scale-100 dark:hover:border-accent dark:hover:bg-bordertheme cursor-pointer dark:hover:text-primary ',
    },
  },
  card: {
    root: {
      base: 'flex rounded-lg  border-1 !hover:bg-white border-bordertheme bg-white dark:bg-white dark:hover:!bg-sectiontheme shadow-md dark:border-bordertheme',
      children: 'flex h-full flex-col justify-center gap-2 p-3',
      horizontal: {
        off: 'flex-col',
        on: 'flex-col md:max-w-xl md:flex-row',
      },
      href: 'hover:bg-gray-100 dark:hover:bg-gray-700',
    },
    img: {
      base: '',
      horizontal: {
        off: 'rounded-t-lg',
        on: 'h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg',
      },
    },
  },
  tabs: {
    base: 'flex flex-col gap-2',
    tablist: {
      base: 'flex text-center',
      variant: {
        default: 'flex-wrap border-b border-primarysky dark:border-gray-700',
        underline: '-mb-px flex-wrap border-b border-primarysky dark:border-gray-700',
        pills: 'flex-wrap space-x-2 text-lg font-medium text-gray-500 dark:text-gray-400',
        fullWidth: 'grid w-full grid-flow-col divide-x divide-gray-200 rounded-none text-lg font-medium shadow dark:divide-gray-700 dark:text-gray-900',
      },
      tabitem: {
        base: 'flex items-center justify-center rounded-t-lg lg:p-4 p-3 text-lg font-medium first:ml-0 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-700 disabled:dark:text-gray-900',
        variant: {
          default: {
            base: 'rounded-t-lg',
            active: {
              on: 'bg-gray-100 text-black dark:bg-gray-800 dark:text-primary-500',
              off: 'text-gray-800 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-800',
            },
          },
          underline: {
            base: 'rounded-t-lg',
            active: {
              on: 'rounded-t-lg border-b-6 border-accent  text-black dark:border-accent dark:text-black',
              off: 'border-b-2 border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800 dark:text-gray-600 dark:hover:text-gray-800',
            },
          },
          pills: {
            base: '',
            active: {
              on: 'rounded-lg bg-primary-600 text-white',
              off: 'rounded-lg hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white',
            },
          },
          fullWidth: {
            base: 'ml-0 flex w-full rounded-none first:ml-0',
            active: {
              on: 'rounded-none bg-gray-100 p-4 text-gray-900 dark:bg-gray-700 dark:text-white',
              off: 'rounded-none bg-white hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white',
            },
          },
        },
        icon: 'mr-2 h-5 w-5',
      },
    },
    tabitemcontainer: {
      base: '',
      variant: {
        default: '',
        underline: '',
        pills: '',
        fullWidth: '',
      },
    },
    tabpanel: 'py-3',
  },

  textInput: {
    field: {
      input: {
        base: 'block w-full  border rounded-xl min-h-11 px-4 !pl-4  focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50', // custom rounded corners
        colors: {
          gray: 'border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-primary dark:border-gray-50 dark:bg-gray-50 dark:text-black dark:placeholder-gray-400 dark:focus:border-primary dark:focus:ring-primary',
        },
      },
    },
  },
  textarea: {
    base: 'block w-full rounded-lg border border-gray-300 p-3 text-sm text-gray-900 focus:border-highlight focus:ring-highlight dark:bg-gray-800 dark:border-gray-600 dark:text-black',
    colors: {
      gray: 'border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-primary dark:border-gray-50 dark:bg-gray-50 dark:text-black dark:placeholder-gray-400 dark:focus:border-primary dark:focus:ring-primary',
    },
  },

  tooltip: {
    target: 'w-fit',
    animation: 'transition-opacity',
    arrow: {
      base: 'absolute z-10 h-2 w-2 rotate-45',
      style: {
        dark: 'bg-black dark:bg-black',
        light: 'bg-white',
        auto: 'bg-white dark:bg-gray-700',
      },
      placement: '-4px',
    },
    base: 'absolute z-10 inline-block rounded-lg px-3 py-2 text-sm font-medium shadow-sm',
    hidden: 'invisible opacity-0',
    style: {
      dark: 'bg-black text-white shadow-lg dark:text-white dark:bg-black',
      light: 'border border-gray-200 bg-white text-gray-900',
      auto: 'border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white',
    },
    content: 'relative z-20',
  },
});
export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={customTheme}>{children}</ThemeProvider>;
}
