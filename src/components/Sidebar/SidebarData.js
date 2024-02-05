import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import BarChartIcon from '@mui/icons-material/BarChart';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

export const SidebarData = [
  {
    title: 'Home',
    Icon: <HomeIcon />,
    link: '/Home',
  },
  {
    title: 'Products',
    Icon: <LocalGroceryStoreIcon />,
    link: '/products',
  },
  {
    title: 'Orders',
    Icon: <BarChartIcon />,
    link: '/Orders',
  },
  {
    title: 'Dataset',
    Icon: <CreateNewFolderIcon />,
    link: '/dataset',
  }
];

export const getPageTitle = (currentPath, data) => {
  const currentPage = data.find((item) => item.link === currentPath);
  return currentPage ? currentPage.title : 'Unknown Page';
};