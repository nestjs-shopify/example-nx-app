import {
  Card,
  Page,
  Layout,
  TextContainer,
  Link,
  Heading,
} from '@shopify/polaris';

import { ProductsCard } from '../components/ProductsCard';

export default function HomePage() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <TextContainer spacing="loose">
              <Heading>Nice work on building a Shopify app 🎉</Heading>
              <p>
                Your app is ready to explore! It contains everything you need to
                get started including the{' '}
                <Link url="https://polaris.shopify.com/" external>
                  Polaris design system
                </Link>
                ,{' '}
                <Link url="https://shopify.dev/api/admin-graphql" external>
                  Shopify Admin API
                </Link>
                , and{' '}
                <Link url="https://shopify.dev/apps/tools/app-bridge" external>
                  App Bridge
                </Link>{' '}
                UI library and components.
              </p>
              <p>
                Ready to go? Start populating your app with some sample products
                to view and test in your store.{' '}
              </p>
              <p>
                Learn more about building out your app in{' '}
                <Link
                  url="https://shopify.dev/apps/getting-started/add-functionality"
                  external
                >
                  this Shopify tutorial
                </Link>{' '}
                📚{' '}
              </p>
            </TextContainer>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <ProductsCard />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
