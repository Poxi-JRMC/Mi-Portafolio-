import React from 'react';
import { Typography, Link, Divider, Chip, Container } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

export default function Project1() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Título hacker */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: 'bold',
          color: '#64ffda',
          mb: 2,
          textShadow: '0 0 10px #64ffda, 0 0 20px #0ff',
        }}
      >
        Proyecto 1 - App de Tareas con React y Firebase
      </Typography>

      {/* Descripción */}
      <Typography paragraph sx={{ mb: 3, lineHeight: 1.6, color: '#ccd6f6' }}>
        Esta aplicación permite crear, editar y eliminar tareas de manera sencilla. Utiliza React para la
        interfaz y Firebase para almacenamiento en la nube. Diseño moderno, funcional y fluido, ideal
        para productividad.
      </Typography>

      <Divider sx={{ borderColor: '#0ff', mb: 3 }} />

      {/* Funcionalidades estilo hacker */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
        {['Crear nuevas tareas', 'Marcar completadas', 'Eliminar tareas', 'Sincronización en tiempo real'].map((f, i) => (
          <Chip
            key={i}
            label={f}
            sx={{
              bgcolor: 'rgba(0,255,255,0.1)',
              color: '#64ffda',
              fontWeight: 500,
              border: '1px solid #64ffda',
              boxShadow: '0 0 5px rgba(100,255,218,0.5)',
            }}
          />
        ))}
      </div>

      {/* Video explicativo */}
      <Typography paragraph sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#ccd6f6' }}>
        <PlayCircleOutlineIcon sx={{ color: '#64ffda' }} /> Mira el video explicativo:
      </Typography>
      <div style={{ position: 'relative', paddingTop: '56.25%', marginBottom: '20px', borderRadius: '10px', overflow: 'hidden' }}>
        <iframe
          src="https://www.youtube.com/embed/E0Q22QNtox0"
          title="Video Proyecto 1"
          frameBorder="0"
          allowFullScreen
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        />
      </div>

      {/* Link al repositorio */}
      <Link
        href="https://github.com/tu-usuario/proyecto1"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          color: '#64ffda',
          fontWeight: 'bold',
          textDecoration: 'none',
          '&:hover': { textDecoration: 'underline', color: '#0ff' },
        }}
      >
        Repositorio GitHub del Proyecto 1
      </Link>
    </Container>
  );
}
