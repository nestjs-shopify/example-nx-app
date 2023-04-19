import { useEffect, useState, useCallback } from 'react';
import { VerticalStack, Button, LegacyCard, Text } from '@shopify/polaris';
import { Toast, useAppBridge } from '@shopify/app-bridge-react';
import { gql, useMutation } from '@apollo/client';
import { userLoggedInFetch } from '../utils/userLoggedInFetch';

const PRODUCTS_QUERY = gql`
  mutation populateProduct($input: ProductInput!) {
    productCreate(input: $input) {
      product {
        title
      }
    }
  }
`;

export function ProductsCard() {
  const [populateProduct, { loading }] = useMutation(PRODUCTS_QUERY);
  const [productCount, setProductCount] = useState(0);
  const [hasResults, setHasResults] = useState(false);

  const app = useAppBridge();
  const fetch = userLoggedInFetch(app);
  const updateProductCount = useCallback(async () => {
    const { count } = await fetch('/api/products/count').then((res) =>
      res.json()
    );
    setProductCount(count);
  }, [fetch]);

  useEffect(() => {
    updateProductCount();
  }, [updateProductCount]);

  const toastMarkup = hasResults && (
    <Toast
      content="1 product created!"
      onDismiss={() => setHasResults(false)}
    />
  );

  return (
    <>
      {toastMarkup}
      <LegacyCard title="Product Counter" sectioned>
        <VerticalStack gap="4">
          <p>
            Sample products are created with a default title and price. You can
            remove them at any time.
          </p>

          <Text as="h2" variant="headingXl">
            TOTAL PRODUCTS
          </Text>

          <Text as="p" fontWeight="bold" variant="heading2xl">
            {productCount}
          </Text>

          <Button
            primary
            loading={loading}
            onClick={() => {
              Promise.all(
                Array.from({ length: 1 }).map(() =>
                  populateProduct({
                    variables: {
                      input: {
                        title: randomTitle(),
                      },
                    },
                  })
                )
              ).then(() => {
                updateProductCount();
                setHasResults(true);
              });
            }}
          >
            Populate 1 product
          </Button>
        </VerticalStack>
      </LegacyCard>
    </>
  );
}

function randomTitle() {
  const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];

  return `${adjective} ${noun}`;
}

const ADJECTIVES = [
  'autumn',
  'hidden',
  'bitter',
  'misty',
  'silent',
  'empty',
  'dry',
  'dark',
  'summer',
  'icy',
  'delicate',
  'quiet',
  'white',
  'cool',
  'spring',
  'winter',
  'patient',
  'twilight',
  'dawn',
  'crimson',
  'wispy',
  'weathered',
  'blue',
  'billowing',
  'broken',
  'cold',
  'damp',
  'falling',
  'frosty',
  'green',
  'long',
  'late',
  'lingering',
  'bold',
  'little',
  'morning',
  'muddy',
  'old',
  'red',
  'rough',
  'still',
  'small',
  'sparkling',
  'throbbing',
  'shy',
  'wandering',
  'withered',
  'wild',
  'black',
  'young',
  'holy',
  'solitary',
  'fragrant',
  'aged',
  'snowy',
  'proud',
  'floral',
  'restless',
  'divine',
  'polished',
  'ancient',
  'purple',
  'lively',
  'nameless',
];

const NOUNS = [
  'waterfall',
  'river',
  'breeze',
  'moon',
  'rain',
  'wind',
  'sea',
  'morning',
  'snow',
  'lake',
  'sunset',
  'pine',
  'shadow',
  'leaf',
  'dawn',
  'glitter',
  'forest',
  'hill',
  'cloud',
  'meadow',
  'sun',
  'glade',
  'bird',
  'brook',
  'butterfly',
  'bush',
  'dew',
  'dust',
  'field',
  'fire',
  'flower',
  'firefly',
  'feather',
  'grass',
  'haze',
  'mountain',
  'night',
  'pond',
  'darkness',
  'snowflake',
  'silence',
  'sound',
  'sky',
  'shape',
  'surf',
  'thunder',
  'violet',
  'water',
  'wildflower',
  'wave',
  'water',
  'resonance',
  'sun',
  'wood',
  'dream',
  'cherry',
  'tree',
  'fog',
  'frost',
  'voice',
  'paper',
  'frog',
  'smoke',
  'star',
];
