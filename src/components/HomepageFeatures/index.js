import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Automated Database Generation',
    Svg: require('@site/static/img/database.svg').default,
    description: (
      <>
        With a defined schema, FastSchema automatically generates the necessary database tables, eliminating the need for manual setup.
      </>
    ),
  },
  {
    title: 'CRUD API Generation',
    Svg: require('@site/static/img/api.svg').default,
    description: (
      <>
        FastSchema creates CRUD APIs based on the schema, enabling seamless interaction with your content.
      </>
    ),
  },
  {
    title: 'Dynamic Content Modeling',
    Svg: require('@site/static/img/content.svg').default,
    description: (
      <>
        Easily create and modify content models through the intuitive admin UI, with changes reflected instantly in the schema definition file.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4 cms-feature')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
