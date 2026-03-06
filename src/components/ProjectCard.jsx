import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

export default function ProjectCard({ title, description, image, sxCard }) {
  return (
    <Card
      sx={{
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(0,0,0,0.35), 0 0 0 1px rgba(100,255,218,0.1)',
        cursor: 'pointer',
        transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 16px 48px rgba(0,0,0,0.5), 0 0 28px rgba(100,255,218,0.22)',
          '& .card-img': { transform: 'scale(1.06)' },
          '& .card-overlay': { opacity: 1 },
        },
        ...sxCard,
      }}
    >
      <Box sx={{ overflow: 'hidden', position: 'relative' }}>
        <CardMedia
          component="img"
          height="210"
          image={image}
          alt={title}
          loading="lazy"
          className="card-img"
          sx={{ transition: 'transform 0.5s ease', display: 'block' }}
          onError={(e) => {
            e.target.src = 'https://placehold.co/400x210/0a192f/64ffda?text=' + encodeURIComponent(title);
          }}
        />
        <Box
          className="card-overlay"
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(10,25,47,0.85) 0%, transparent 55%)',
            opacity: 0,
            transition: 'opacity 0.35s ease',
            display: 'flex',
            alignItems: 'flex-end',
            pb: 1.5,
            pl: 2,
          }}
        >
          <Typography sx={{ color: '#64ffda', fontSize: '0.82rem', fontWeight: 600, letterSpacing: 1 }}>
            VER DETALLE →
          </Typography>
        </Box>
      </Box>
      <CardContent
        sx={{
          bgcolor: 'rgba(10,25,47,0.97)',
          px: 2.5,
          py: 2,
          borderTop: '1px solid rgba(100,255,218,0.18)',
        }}
      >
        <Typography
          variant="h6"
          fontWeight={600}
          gutterBottom
          sx={{ letterSpacing: 0.3, color: '#64ffda', fontSize: '1rem' }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: '0.88rem',
            lineHeight: 1.6,
            color: '#8892b0',
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
