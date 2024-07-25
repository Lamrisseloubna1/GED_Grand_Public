"use client";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue, green, red, pink, orange, purple, yellow, brown } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useRouter } from 'next/navigation'; 

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ThematicCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: theme.spacing(2),
  boxShadow: theme.shadows[5],
  borderRadius: '20px',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, background 0.3s ease-in-out',
  background: 'linear-gradient(to right, #ffffff, #f0f0f0)',
  '&:hover': {
    transform: 'scale(1.05) rotate(1deg)',
    boxShadow: theme.shadows[20],
    background: 'linear-gradient(to right, #f0f0f0, #ffffff)',
  },
}));

const CardImage = styled(CardMedia)({
  height: 140,
  borderRadius: '20px 20px 0 0',
});

interface ThemeCardProps {
  title: string;
  description: string;
  avatarLetter: string;
  avatarColor: string;
}

function ThemeCard({ title, description, avatarLetter, avatarColor }: ThemeCardProps) {
  const [expanded, setExpanded] = React.useState(false);
  const router = useRouter(); 

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCardClick = () => {
    router.push('/bulletin/BO'); 
  };

  return (
    <ThematicCard onClick={handleCardClick}> 
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: avatarColor }}>
            {avatarLetter}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardImage
        image="./static/images/image.png"
        title={title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>More about {title}:</Typography>
          <Typography paragraph>
            Additional information can go here, such as relevant articles or detailed descriptions.
          </Typography>
        </CardContent>
      </Collapse>
    </ThematicCard>
  );
}

export default function ThematicCards() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
      <ThemeCard
        title="Économie et Finances"
        description="Documents relatifs aux politiques économiques et financières."
        avatarLetter="E"
        avatarColor={blue[500]}
      />
      <ThemeCard
        title="Politique"
        description="Documents relatifs aux politiques gouvernementales."
        avatarLetter="P"
        avatarColor={green[500]}
      />
      <ThemeCard
        title="Justice et Droit"
        description="Documents relatifs aux lois et régulations juridiques."
        avatarLetter="J"
        avatarColor={red[500]}
      />
      <ThemeCard
        title="Santé"
        description="Documents relatifs aux politiques de santé publique."
        avatarLetter="S"
        avatarColor={pink[500]}
      />
      <ThemeCard
        title="Travail et Emploi"
        description="Documents relatifs aux réglementations du travail et aux politiques de l'emploi."
        avatarLetter="T"
        avatarColor={orange[500]}
      />
      <ThemeCard
        title="Habitat et Urbanisme"
        description="Documents relatifs au logement et à l'aménagement urbain."
        avatarLetter="H"
        avatarColor={purple[500]}
      />
      <ThemeCard
        title="Agriculture et Pêche"
        description="Documents relatifs aux politiques agricoles et à la pêche."
        avatarLetter="A"
        avatarColor={yellow[500]}
      />
      <ThemeCard
        title="Environnement et Développement Durable"
        description="Documents relatifs aux politiques environnementales et au développement durable."
        avatarLetter="D"
        avatarColor={brown[500]}
      />
    </div>
  );
}
