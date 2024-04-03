import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Automated Database Generation',
    Svg: require('@site/static/img/database.svg').default,
    description: (
      <>
        Supports a variety of database, including Postgresql, MySQL, SQLite and automatically generates the DB tables.
      </>
    ),
  },
  {
    title: 'CRUD API Generation',
    Svg: require('@site/static/img/api.svg').default,
    description: (
      <>
        Automatically creates CRUD APIs with flexible filter based on the schema, enabling seamless interaction with your content.
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
  {
    title: 'Built-in File Management',
    Svg: require('@site/static/img/file.svg').default,
    description: (
      <>Fastschema allowing you to upload and serve files directly from your application with many drivers like local, s3, etc.</>
    )
  },
  {
    title: 'Built-in Admin Control Panel',
    Svg: require('@site/static/img/dashboard.svg').default,
    description: (
      <>Built-in admin control panel provide an intuitive interface for managing your data: CRUD operations, search, filter, and more.</>
    )
  },
  {
    title: 'Role-Based Access Control',
    Svg: require('@site/static/img/role.svg').default,
    description: (
      <>Fastschema includes RBAC features, allowing you to define granular permissions for different user roles, ensuring that your data is secure.</>
    )
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx(styles.cmsFeature, 'col col--4')}>
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
        <div className={clsx(styles.featureContainer, 'row')}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
