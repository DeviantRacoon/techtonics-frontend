'use client';

import React, { useState } from 'react';
import Router from 'next/router';

import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
  useTheme,
  Paper,
  Tooltip,
  Stack,
  Drawer,
  useMediaQuery,
} from '@mui/material';

import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import Person from '@mui/icons-material/Person';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';

import { useAppSelector } from '@/common/hooks';
import { selectCurrentUser, clearCurrentUser as clearCurrentUserRedux } from '@/common/store';
import { clearCurrentUser } from '@/common/utils';

import ModalForm from '../../ModalForm';

import SessionService from '@/modules/session/infrastructure/session-service';

const sessionService = new SessionService();

export default function UserMenu() {
  const [modalProfile, setModalProfile] = useState({
    isOpen: false,
    isEdit: false,
    title: "",
    description: ""
  });
  const currentUser = useAppSelector(selectCurrentUser);

  const router = Router;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (isMobile) {
      setDrawerOpen(true);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setDrawerOpen(false);
  };

  const handleLogout = () => {
    clearCurrentUserRedux();
    clearCurrentUser();
    sessionService.fetchCloseSession();
    router.push('/auth');
    handleClose();
  };

  const renderMenuContent = () => (
    <Stack spacing={1} p={1}>
      <Box px={1.5} py={1}>
        <Typography variant="subtitle2" color="text.primary" fontWeight={700}>
          {currentUser?.username}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Usuario activo
        </Typography>
      </Box>

      <Divider />

      <MenuItem onClick={handleClose} sx={{ px: 2 }}>
        <ListItemIcon>
          <Person fontSize="small" color="action" />
        </ListItemIcon>
        <Typography variant="body2" color="text.primary" onClick={() => {
          setModalProfile({
            isOpen: true,
            isEdit: false,
            title: "Perfil",
            description: "Información del perfil"
          })
        }}>
          Perfil
        </Typography>
      </MenuItem>

      <MenuItem onClick={handleClose} sx={{ px: 2 }}>
        <ListItemIcon>
          <Settings fontSize="small" color="action" />
        </ListItemIcon>
        <Typography variant="body2" color="text.primary">
          Configuración
        </Typography>
      </MenuItem>

      <Divider />

      <MenuItem onClick={handleLogout} sx={{ px: 2, color: theme.palette.error.main }}>
        <ListItemIcon>
          <Logout fontSize="small" color="error" />
        </ListItemIcon>
        <Typography variant="body2" fontWeight={500}>
          Cerrar sesión
        </Typography>
      </MenuItem>
    </Stack>
  );

  return (
    <Box display="flex" alignItems="center">
      <Tooltip title="Opciones de usuario" arrow>
        <IconButton
          onClick={handleOpen}
          sx={{
            px: 1,
            py: 0.5,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            '&:hover': { backgroundColor: theme.palette.action.hover },
          }}>

          <Avatar
            alt={currentUser?.username}
            sx={{ width: 36, height: 36, bgcolor: theme.palette.grey[300] }}>
            {currentUser?.username?.charAt(0).toUpperCase()}
          </Avatar>

          {!isMobile && (
            <ArrowDropDown fontSize="small" sx={{ color: 'text.primary' }} />
          )}

          {isMobile && <MenuIcon sx={{ color: 'text.primary' }} />}
        </IconButton>
      </Tooltip>

      {/* Desktop dropdown menu */}
      <Menu
        anchorEl={anchorEl}
        id="user-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: Paper,
          elevation: 10,
          sx: {
            mt: 1.2,
            borderRadius: 2,
            minWidth: 240,
            px: 0.5,
            backgroundColor: theme.palette.background.paper,
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        {renderMenuContent()}
      </Menu>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: '80vw',
            maxWidth: 300,
            p: 2,
            backgroundColor: theme.palette.background.paper,
          },
        }}>
        {renderMenuContent()}
      </Drawer>


      <ModalForm
        title="Perfil"
        data={{}}
        description="Este es tu perfil del usuario"
        isOpen={modalProfile.isOpen}
        onClose={() => setModalProfile({ isOpen: false, isEdit: false, title: "", description: "" })}
        onSubmit={() => { }}
        schema={[
          {
            key: "ds_user",
            label: "Nombre de usuario",
            disabled: true,
          },
        ]
        }>

      </ModalForm>
    </Box >
  );
}
