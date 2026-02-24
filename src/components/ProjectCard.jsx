import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import TouchAppIcon from '@mui/icons-material/TouchApp';

export default function ProjectCard({ title, description, image, sxCard }) {
  return (
    <Card
      sx={{
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(100,255,218,0.1)',
        cursor: 'pointer',
        transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
        '&:hover': {
          transform: 'translateY(-10px) scale(1.01)',
          boxShadow: '0 16px 48px rgba(0,0,0,0.5), 0 0 24px rgba(100, 255, 218, 0.25)',
          '& .card-overlay': { opacity: 1 },
          '& .card-hint': { opacity: 1 },
        },
        ...sxCard,
      }}
    >
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height="220"
          image={image}
          alt={title}
          sx={{
            transition: 'transform 0.5s ease, filter 0.4s ease',
            '&:hover': {
              transform: 'scale(1.08)',
              filter: 'brightness(1.05)',
            },
          }}
          onError={(e) => {
            e.target.src = 'https://placehold.co/400x220/0a192f/64ffda?text=' + encodeURIComponent(title);
          }}
        />
        <Box
          className="card-overlay"
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(10,25,47,0.95) 0%, transparent 50%)',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            className="card-hint"
            sx={{
              opacity: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              color: '#64ffda',
              fontSize: '0.9rem',
              fontWeight: 600,
            }}
          >
            <TouchAppIcon sx={{ fontSize: 20 }} />
            Ver detalle
          </Box>
        </Box>
      </Box>
      <CardContent
        sx={{
          color: 'white',
          background: 'linear-gradient(180deg, rgba(10,25,47,0.95) 0%, rgba(9,48,53,0.6) 100%)',
          px: 2.5,
          py: 2,
          borderTop: '1px solid rgba(100,255,218,0.2)',
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
          sx={{ letterSpacing: 0.5, fontFamily: "'Inter', sans-serif", color: '#64ffda', fontSize: '1.1rem' }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: '0.9rem',
            lineHeight: 1.6,
            fontFamily: "'Inter', sans-serif",
            color: '#a8b2d1',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
